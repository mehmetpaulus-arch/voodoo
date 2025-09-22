import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface TranscriptionSettings {
  modelSize: string;
  task: string;
  language: string;
  wordTimestamps: boolean;
}

interface TranscriptionResult {
  id: string;
  filename: string;
  status: 'processing' | 'completed' | 'error';
  text?: string;
  language?: string;
  duration?: number;
  formats: {
    txt?: string;
    srt?: string;
    vtt?: string;
    json?: string;
  };
  error?: string;
}

// Ensure uploads directory exists
async function ensureUploadsDir() {
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true });
  }
  return uploadsDir;
}

// Bootstrap Whisper installation
async function bootstrapWhisper(): Promise<boolean> {
  try {
    console.log('Checking Python and Whisper environment...');
    
    // Try different Python paths
    const possiblePaths = [
      'python3',
      'python',
      'py'
    ];
    
    let pythonPath = '';
    for (const path of possiblePaths) {
      try {
        const { stdout } = await execAsync(`"${path}" --version`);
        console.log(`Python found at ${path}:`, stdout.trim());
        pythonPath = path;
        break;
      } catch (error) {
        console.log(`Python not found at ${path}`);
      }
    }
    
    if (!pythonPath) {
      console.error('Python not found in any of the expected locations');
      return false;
    }

    // Test Whisper availability
    try {
      await execAsync(`"${pythonPath}" -c "import whisper; print('Whisper available')"`);
      console.log('Whisper AI ready for transcription');
      return true;
    } catch (error) {
      console.error('Whisper not available:', error);
      return false;
    }
  } catch (error) {
    console.error('Whisper initialization failed:', error);
    return false;
  }
}

// Format timestamp for SRT format
function formatTimestamp(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
}

// Convert JSON segments to SRT format
function jsonToSrt(segments: any[]): string {
  return segments.map((segment, index) => {
    const start = formatTimestamp(segment.start);
    const end = formatTimestamp(segment.end);
    return `${index + 1}\n${start} --> ${end}\n${segment.text.trim()}\n`;
  }).join('\n');
}

// Convert JSON segments to VTT format
function jsonToVtt(segments: any[]): string {
  const header = 'WEBVTT\n\n';
  const content = segments.map(segment => {
    const start = formatTimestamp(segment.start).replace(',', '.');
    const end = formatTimestamp(segment.end).replace(',', '.');
    return `${start} --> ${end}\n${segment.text.trim()}\n`;
  }).join('\n');
  return header + content;
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== TRANSCRIPTION API CALLED ===');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const settings = JSON.parse(formData.get('settings') as string) as TranscriptionSettings;

    console.log('File received:', file?.name, 'Size:', file?.size);
    console.log('Settings:', settings);

    if (!file) {
      console.log('ERROR: No file provided');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check file size (limit to 2GB)
    const maxSize = 2 * 1024 * 1024 * 1024; // 2GB
    if (file.size > maxSize) {
      console.log('ERROR: File too large:', file.size, 'bytes');
      return NextResponse.json({ 
        error: 'Datei zu groß. Maximale Größe: 2GB' 
      }, { status: 400 });
    }

    console.log('File size OK, proceeding with transcription...');

    // Save uploaded file
    const uploadsDir = await ensureUploadsDir();
    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const fileName = `${timestamp}_${file.name}`;
    const filePath = path.join(uploadsDir, fileName);
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);
    
    console.log('File saved to:', filePath);

    // Check if Whisper is available
    const whisperAvailable = await bootstrapWhisper();
    if (!whisperAvailable) {
      console.log('Whisper not available, returning error');
      return NextResponse.json({ 
        error: 'Whisper AI ist nicht verfügbar. Bitte installieren Sie die erforderlichen Abhängigkeiten.' 
      }, { status: 500 });
    }

    try {
      // Run Whisper transcription
      const pythonScript = path.join(process.cwd(), 'lib', 'whisper_transcribe.py');
      const outputFile = path.join(uploadsDir, `output_${timestamp}`, 'result.json');
      
      // Create output directory
      await mkdir(path.dirname(outputFile), { recursive: true });
      
      // Validate model size
      const validModels = ['tiny', 'base', 'small', 'medium', 'large'];
      if (!validModels.includes(settings.modelSize)) {
        throw new Error(`Invalid model size: ${settings.modelSize}. Valid options: ${validModels.join(', ')}`);
      }
      
      const whisperCommand = `python3 "${pythonScript}" "${filePath}" --model ${settings.modelSize} --language ${settings.language || 'auto'} --output "${outputFile}"`;
      
      console.log('Running Whisper command:', whisperCommand);
      console.log('Model size:', settings.modelSize);
      console.log('Language:', settings.language || 'auto');
      
      const { stdout, stderr } = await execAsync(whisperCommand);
      
      console.log('Whisper stdout:', stdout);
      if (stderr) console.log('Whisper stderr:', stderr);
      
      // Read the result
      const resultData = await readFile(outputFile, 'utf-8');
      const whisperResult = JSON.parse(resultData);
      
      if (whisperResult.error) {
        throw new Error(whisperResult.error);
      }
      
      // Generate output files
      const baseName = path.basename(file.name, fileExtension);
      const outputDir = path.dirname(outputFile);
      
      // Save text file
      const txtFile = path.join(outputDir, `${baseName}.txt`);
      await writeFile(txtFile, whisperResult.text);
      
      // Generate SRT file
      const srtFile = path.join(outputDir, `${baseName}.srt`);
      const srtContent = jsonToSrt(whisperResult.segments);
      await writeFile(srtFile, srtContent);
      
      // Generate VTT file
      const vttFile = path.join(outputDir, `${baseName}.vtt`);
      const vttContent = jsonToVtt(whisperResult.segments);
      await writeFile(vttFile, vttContent);
      
      const result: TranscriptionResult = {
        id: timestamp.toString(),
        filename: file.name,
        status: 'completed',
        text: whisperResult.text,
        language: whisperResult.language,
        duration: whisperResult.duration,
        formats: {
          txt: txtFile,
          srt: srtFile,
          vtt: vttFile,
          json: outputFile
        }
      };
      
      console.log('Transcription completed successfully');
      return NextResponse.json(result);
      
    } catch (error) {
      console.error('Transcription failed:', error);
      return NextResponse.json({ 
        error: `Transkription fehlgeschlagen: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}` 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler') }, { status: 500 });
  }
}