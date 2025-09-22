import { NextRequest, NextResponse } from 'next/server';

// ElevenLabs API Configuration
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1/sound-generation';
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

// Supported output formats
const SUPPORTED_FORMATS = {
  'mp3_44100_128': 'mp3_44100_128',
  'mp3_44100_192': 'mp3_44100_192',
  'mp3_22050_32': 'mp3_22050_32',
  'pcm_44100': 'pcm_44100'
};

// Supported models
const SUPPORTED_MODELS = {
  'eleven_text_to_sound_v2': 'eleven_text_to_sound_v2',
  'eleven_text_to_sound_v1': 'eleven_text_to_sound_v1'
};

interface GenerationRequest {
  text: string;
  model_id?: string;
  output_format?: string;
  duration_seconds?: number;
  prompt_influence?: number;
  loop?: boolean;
}

interface GenerationResponse {
  success: boolean;
  audio_url?: string;
  audio_data?: string;
  error?: string;
  metadata?: {
    duration: number;
    format: string;
    model: string;
    size: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!ELEVENLABS_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'ElevenLabs API Key ist nicht konfiguriert. Bitte füge ELEVENLABS_API_KEY zu deinen Umgebungsvariablen hinzu.'
      }, { status: 500 });
    }

    // Parse request body
    const body: GenerationRequest = await request.json();
    const { text, model_id, output_format, duration_seconds, prompt_influence, loop } = body;

    // Validate required fields
    if (!text || text.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Text-Prompt ist erforderlich'
      }, { status: 400 });
    }

    // Validate text length
    if (text.length > 1000) {
      return NextResponse.json({
        success: false,
        error: 'Text-Prompt ist zu lang (max. 1000 Zeichen)'
      }, { status: 400 });
    }

    // Validate duration
    if (duration_seconds && (duration_seconds < 0.5 || duration_seconds > 30)) {
      return NextResponse.json({
        success: false,
        error: 'Dauer muss zwischen 0.5 und 30 Sekunden liegen'
      }, { status: 400 });
    }

    // Validate prompt influence
    if (prompt_influence && (prompt_influence < 0 || prompt_influence > 1)) {
      return NextResponse.json({
        success: false,
        error: 'Prompt Influence muss zwischen 0 und 1 liegen'
      }, { status: 400 });
    }

    // Set defaults
    const model = model_id && SUPPORTED_MODELS[model_id as keyof typeof SUPPORTED_MODELS] 
      ? model_id 
      : 'eleven_text_to_sound_v2';
    
    const format = output_format && SUPPORTED_FORMATS[output_format as keyof typeof SUPPORTED_FORMATS]
      ? output_format
      : 'mp3_44100_128';

    // Prepare ElevenLabs API request
    const elevenLabsRequest = {
      text: text.trim(),
      model_id: model,
      output_format: format,
      ...(duration_seconds && { duration_seconds }),
      ...(prompt_influence !== undefined && { prompt_influence }),
      ...(loop !== undefined && { loop })
    };

    console.log('Sending request to ElevenLabs:', {
      ...elevenLabsRequest,
      text: text.substring(0, 50) + '...' // Log only first 50 chars for privacy
    });

    // Call ElevenLabs API
    const response = await fetch(ELEVENLABS_API_URL, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'User-Agent': 'ZDF-Music-Generator/1.0'
      },
      body: JSON.stringify(elevenLabsRequest)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('ElevenLabs API Error:', response.status, errorData);
      
      let errorMessage = 'Fehler bei der Musik-Generierung';
      
      switch (response.status) {
        case 401:
          errorMessage = 'Ungültiger API Key. Bitte überprüfe deine ElevenLabs API-Konfiguration.';
          break;
        case 402:
          errorMessage = 'Kontingent überschritten. Bitte überprüfe dein ElevenLabs Abonnement.';
          break;
        case 422:
          errorMessage = 'Ungültige Anfrage-Parameter. Bitte überprüfe deine Eingaben.';
          break;
        case 429:
          errorMessage = 'Zu viele Anfragen. Bitte warte einen Moment und versuche es erneut.';
          break;
        case 500:
          errorMessage = 'ElevenLabs Server-Fehler. Bitte versuche es später erneut.';
          break;
        default:
          errorMessage = `API-Fehler (${response.status}): ${errorData}`;
      }

      return NextResponse.json({
        success: false,
        error: errorMessage
      }, { status: response.status });
    }

    // Get audio data
    const audioBuffer = await response.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');
    
    // Calculate file size
    const fileSize = audioBuffer.byteLength;
    
    // Estimate duration if not provided
    const estimatedDuration = duration_seconds || Math.min(30, Math.max(0.5, text.length / 10));

    // Prepare response
    const result: GenerationResponse = {
      success: true,
      audio_data: audioBase64,
      metadata: {
        duration: estimatedDuration,
        format: format,
        model: model,
        size: fileSize
      }
    };

    console.log('Successfully generated audio:', {
      duration: estimatedDuration,
      format: format,
      model: model,
      size: fileSize
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error('Music generation error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Interner Server-Fehler bei der Musik-Generierung'
    }, { status: 500 });
  }
}

// GET endpoint for API information
export async function GET() {
  return NextResponse.json({
    name: 'ZDF Music Generator API',
    version: '1.0.0',
    description: 'KI-Musik-Generierung mit ElevenLabs AI',
    endpoints: {
      'POST /api/music-generator': 'Generiere Musik und Sound Effects'
    },
    supported_models: Object.keys(SUPPORTED_MODELS),
    supported_formats: Object.keys(SUPPORTED_FORMATS),
    limits: {
      max_text_length: 1000,
      min_duration: 0.5,
      max_duration: 30,
      min_prompt_influence: 0,
      max_prompt_influence: 1
    },
    requirements: {
      api_key: 'ELEVENLABS_API_KEY environment variable required'
    }
  });
}

