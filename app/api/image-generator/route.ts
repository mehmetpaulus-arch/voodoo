import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Gemini Configuration (will be implemented)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

interface GenerationRequest {
  prompt: string;
  provider: 'openai' | 'gemini';
  model?: string;
  size?: string;
  quality?: string;
  style?: string;
  n?: number;
  seed?: number;
  editMode?: boolean;
  image?: File;
}

interface GenerationResponse {
  success: boolean;
  images?: string[];
  error?: string;
  metadata?: {
    provider: string;
    model: string;
    size: string;
    quality: string;
    style: string;
    count: number;
    timestamp: string;
  };
}

// OpenAI Image Generation
async function generateWithOpenAI(request: GenerationRequest): Promise<GenerationResponse> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API Key ist nicht konfiguriert');
    }

    // Map size format for OpenAI
    const sizeMap: { [key: string]: string } = {
      '1024x1024': '1024x1024',
      '1024x1792': '1024x1792',
      '1792x1024': '1792x1024'
    };

    const openaiSize = sizeMap[request.size || '1024x1024'] || '1024x1024';
    const quality = request.quality === 'hd' ? 'hd' : 'standard';
    const style = request.style === 'vivid' ? 'vivid' : 'natural';

    console.log('Generating with OpenAI:', {
      prompt: request.prompt.substring(0, 50) + '...',
      size: openaiSize,
      quality,
      style,
      n: request.n || 1,
      editMode: request.editMode || false
    });

    let response;

    if (request.editMode && request.image) {
      // Image editing with DALL-E 2
      console.log('Using DALL-E 2 for image editing');
      
      // Convert File to base64
      const arrayBuffer = await request.image.arrayBuffer();
      const base64Image = Buffer.from(arrayBuffer).toString('base64');
      
      response = await openai.images.edit({
        model: 'dall-e-2',
        image: base64Image as any,
        prompt: request.prompt,
        n: Math.min(request.n || 1, 4),
        size: '1024x1024' as '1024x1024' | '512x512' | '256x256',
        response_format: 'b64_json'
      });
    } else {
      // Image generation with DALL-E 3
      response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: request.prompt,
        size: openaiSize as '1024x1024' | '1024x1792' | '1792x1024',
        quality: quality as 'standard' | 'hd',
        style: style as 'vivid' | 'natural',
        n: Math.min(request.n || 1, 1), // DALL-E 3 only supports 1 image at a time
        response_format: 'b64_json'
      });
    }

    const images = response.data?.map(item => {
      if (item.b64_json) {
        return `data:image/png;base64,${item.b64_json}`;
      }
      return '';
    }).filter(img => img);

    return {
      success: true,
      images,
      metadata: {
        provider: 'openai',
        model: request.editMode ? 'dall-e-2' : 'dall-e-3',
        size: request.editMode ? '1024x1024' : openaiSize,
        quality: request.editMode ? 'standard' : quality,
        style: request.editMode ? 'natural' : style,
        count: images?.length || 0,
        timestamp: new Date().toISOString()
      }
    };

  } catch (error) {
    console.error('OpenAI generation error:', error);
    
    let errorMessage = 'Fehler bei der OpenAI Bildgenerierung';
    
    if (error instanceof Error) {
      if (error.message.includes('billing')) {
        errorMessage = 'OpenAI API Billing-Fehler. Bitte überprüfe dein OpenAI Abonnement.';
      } else if (error.message.includes('rate_limit')) {
        errorMessage = 'Rate Limit erreicht. Bitte warte einen Moment und versuche es erneut.';
      } else if (error.message.includes('content_policy')) {
        errorMessage = 'Inhalt verstößt gegen OpenAI Content Policy. Bitte ändere deinen Prompt.';
      } else if (error.message.includes('image')) {
        errorMessage = 'Fehler beim Verarbeiten des hochgeladenen Bildes. Bitte überprüfe das Format.';
      } else {
        errorMessage = `OpenAI Fehler: ${error.message}`;
      }
    }

    return {
      success: false,
      error: errorMessage
    };
  }
}

// Gemini Image Generation using 2.5 Flash Image Preview
async function generateWithGemini(request: GenerationRequest): Promise<GenerationResponse> {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API Key ist nicht konfiguriert');
    }

    console.log('Generating with Gemini 2.5 Flash Image Preview:', {
      prompt: request.prompt.substring(0, 50) + '...',
      n: request.n || 1,
      editMode: request.editMode || false
    });

    // Use Python script for Gemini 2.5 Flash Image Preview
    const { spawn } = require('child_process');
    const path = require('path');
    const fs = require('fs').promises;
    
    return new Promise(async (resolve) => {
      try {
        let tempImagePath: string | null = null;
        
        // If editing mode with uploaded image, save it temporarily
        if (request.editMode && request.image) {
          const arrayBuffer = await request.image.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          tempImagePath = path.join(process.cwd(), 'temp_uploaded_image.png');
          await fs.writeFile(tempImagePath, buffer);
        }

        const pythonScript = path.join(process.cwd(), 'lib', 'gemini_image_generator.py');
        const args = [pythonScript, request.prompt];
        
        if (tempImagePath) {
          args.push(tempImagePath);
        }
        
        const pythonProcess = spawn('python', args, {
          env: { ...process.env, GEMINI_API_KEY }
        });

        let output = '';
        let errorOutput = '';

        pythonProcess.stdout.on('data', (data: any) => {
          output += data.toString();
        });

        pythonProcess.stderr.on('data', (data: any) => {
          errorOutput += data.toString();
        });

        pythonProcess.on('close', async (code: any) => {
          // Clean up temporary file
          if (tempImagePath) {
            try {
              await fs.unlink(tempImagePath);
            } catch (cleanupError) {
              console.warn('Could not clean up temp file:', cleanupError);
            }
          }

          if (code === 0) {
            try {
              // Parse the JSON output from Python script
              const lines = output.split('\n');
              const jsonLine = lines.find(line => line.trim().startsWith('{'));
              
              if (jsonLine) {
                const result = JSON.parse(jsonLine);
                
                if (result.success && result.images && result.images.length > 0) {
                  resolve({
                    success: true,
                    images: result.images,
                    metadata: {
                      provider: 'gemini',
                      model: 'gemini-2.5-flash-image-preview',
                      size: request.size || '1024x1024',
                      quality: request.quality || 'standard',
                      style: request.style || 'vivid',
                      count: result.count,
                      timestamp: new Date().toISOString()
                    }
                  });
                } else {
                  resolve({
                    success: false,
                    error: result.error || 'Keine Bilder von Gemini generiert'
                  });
                }
              } else {
                resolve({
                  success: false,
                  error: 'Ungültige Antwort von Gemini Python Script'
                });
              }
            } catch (parseError) {
              console.error('Error parsing Gemini response:', parseError);
              resolve({
                success: false,
                error: 'Fehler beim Verarbeiten der Gemini Antwort'
              });
            }
          } else {
            console.error('Python script error:', errorOutput);
            resolve({
              success: false,
              error: `Gemini Python Script Fehler: ${errorOutput}`
            });
          }
        });
      } catch (error) {
        resolve({
          success: false,
          error: `Fehler beim Verarbeiten des Bildes: ${error}`
        });
      }
    });

    /* 
    // Original Gemini Implementation (deaktiviert)
    console.log('Generating with Gemini:', {
      prompt: request.prompt.substring(0, 50) + '...',
      n: request.n || 1
    });

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: request.prompt
          }]
        }],
        generationConfig: {
          responseModalities: ['IMAGE']
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', response.status, errorData);
      throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('Gemini response received:', JSON.stringify(data, null, 2));

    // Process Gemini response
    const images: string[] = [];
    
    // Check for different possible response structures
    if (data.candidates && data.candidates[0]) {
      const candidate = data.candidates[0];
      
      // Check if content exists
      if (candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData && part.inlineData.data) {
            // Convert base64 data to data URL
            const mimeType = part.inlineData.mimeType || 'image/png';
            const imageData = `data:${mimeType};base64,${part.inlineData.data}`;
            images.push(imageData);
          }
        }
      }
      
      // Check if parts are directly on candidate
      if (candidate.parts) {
        for (const part of candidate.parts) {
          if (part.inlineData && part.inlineData.data) {
            // Convert base64 data to data URL
            const mimeType = part.inlineData.mimeType || 'image/png';
            const imageData = `data:${mimeType};base64,${part.inlineData.data}`;
            images.push(imageData);
          }
        }
      }
    }

    if (images.length === 0) {
      console.log('No images found in response, trying alternative parsing...');
      
      // Try to find images in the response structure
      const responseStr = JSON.stringify(data);
      if (responseStr.includes('inlineData') || responseStr.includes('data:')) {
        console.log('Found potential image data in response');
      }
      
      throw new Error('Keine Bilder in der Gemini Antwort gefunden. Möglicherweise unterstützt das Modell noch keine Bildgenerierung.');
    }

    return {
      success: true,
      images,
      metadata: {
        provider: 'gemini',
        model: 'gemini-2.0-flash-exp',
        size: request.size || '1024x1024',
        quality: request.quality || 'standard',
        style: request.style || 'vivid',
        count: images.length,
        timestamp: new Date().toISOString()
      }
    };
    */

  } catch (error) {
    console.error('Gemini generation error:', error);
    
    let errorMessage = 'Fehler bei der Gemini Bildgenerierung';
    
    if (error instanceof Error) {
      if (error.message.includes('API_KEY')) {
        errorMessage = 'Gemini API Key ist ungültig oder nicht konfiguriert';
      } else if (error.message.includes('QUOTA_EXCEEDED')) {
        errorMessage = 'Gemini API Kontingent überschritten';
      } else if (error.message.includes('SAFETY')) {
        errorMessage = 'Inhalt verstößt gegen Gemini Safety Guidelines';
      } else if (error.message.includes('response modalities')) {
        errorMessage = 'Gemini 2.0 Flash unterstützt noch keine Bildgenerierung. Bitte verwende OpenAI DALL-E 3.';
      } else {
        errorMessage = `Gemini Fehler: ${error.message}`;
      }
    }

    return {
      success: false,
      error: errorMessage
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    let body: GenerationRequest;

    if (contentType?.includes('multipart/form-data')) {
      // Handle FormData (with file upload)
      const formData = await request.formData();
      const prompt = formData.get('prompt') as string;
      const provider = formData.get('provider') as string;
      const model = formData.get('model') as string;
      const size = formData.get('size') as string;
      const quality = formData.get('quality') as string;
      const style = formData.get('style') as string;
      const n = parseInt(formData.get('n') as string) || 1;
      const seed = formData.get('seed') ? parseInt(formData.get('seed') as string) : undefined;
      const editMode = formData.get('editMode') === 'true';
      const image = formData.get('image') as File | null;

      body = {
        prompt,
        provider: provider as 'openai' | 'gemini',
        model,
        size,
        quality,
        style,
        n,
        seed,
        editMode,
        image: image || undefined
      };
    } else {
      // Handle JSON (without file upload)
      body = await request.json();
    }

    const { prompt, provider, model, size, quality, style, n, seed, editMode, image } = body;

    // Validate required fields
    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Prompt ist erforderlich'
      }, { status: 400 });
    }

    // Validate prompt length
    if (prompt.length > 1000) {
      return NextResponse.json({
        success: false,
        error: 'Prompt ist zu lang (max. 1000 Zeichen)'
      }, { status: 400 });
    }

    // Validate edit mode requirements
    if (editMode && !image) {
      return NextResponse.json({
        success: false,
        error: 'Bild ist für den Bearbeitungsmodus erforderlich'
      }, { status: 400 });
    }

    // Validate number of images
    const imageCount = Math.min(Math.max(n || 1, 1), editMode ? 4 : 1);
    
    // Validate provider
    if (!provider || !['openai', 'gemini'].includes(provider)) {
      return NextResponse.json({
        success: false,
        error: 'Ungültiger Provider. Verwende "openai" oder "gemini"'
      }, { status: 400 });
    }

    console.log('Image generation request:', {
      provider,
      prompt: prompt.substring(0, 50) + '...',
      size,
      quality,
      style,
      n: imageCount,
      editMode,
      hasImage: !!image
    });

    let result: GenerationResponse;

    // Route to appropriate provider
    if (provider === 'openai') {
      result = await generateWithOpenAI({
        prompt: prompt.trim(),
        provider,
        model,
        size,
        quality,
        style,
        n: imageCount,
        seed,
        editMode,
        image
      });
    } else if (provider === 'gemini') {
      result = await generateWithGemini({
        prompt: prompt.trim(),
        provider,
        model,
        size,
        quality,
        style,
        n: imageCount,
        seed,
        editMode,
        image
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Unbekannter Provider'
      }, { status: 400 });
    }

    if (result.success) {
      console.log('Successfully generated images:', {
        provider: result.metadata?.provider,
        count: result.images?.length,
        model: result.metadata?.model,
        editMode
      });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Image generation API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Interner Server-Fehler bei der Bildgenerierung'
    }, { status: 500 });
  }
}

// GET endpoint for API information
export async function GET() {
  return NextResponse.json({
    name: 'ZDF Image Generator API',
    version: '1.0.0',
    description: 'KI-Bildgenerierung mit OpenAI DALL-E 3 und Google Gemini',
    providers: {
      openai: {
        name: 'OpenAI DALL-E 3',
        models: ['dall-e-3'],
        sizes: ['1024x1024', '1024x1792', '1792x1024'],
        qualities: ['standard', 'hd'],
        styles: ['vivid', 'natural'],
        max_images: 1
      },
      gemini: {
        name: 'Google Gemini',
        models: ['gemini-2.0-flash-exp'],
        sizes: ['1024x1024', '1024x1792', '1792x1024'],
        qualities: ['standard', 'hd'],
        styles: ['vivid', 'natural'],
        max_images: 4
      }
    },
    limits: {
      max_prompt_length: 1000,
      max_images_per_request: 4,
      supported_formats: ['png', 'jpeg', 'webp']
    },
    requirements: {
      openai: 'OPENAI_API_KEY environment variable required',
      gemini: 'GEMINI_API_KEY environment variable required'
    }
  });
}
