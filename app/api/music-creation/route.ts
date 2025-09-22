import { NextRequest, NextResponse } from 'next/server';

interface MusicGenerationRequest {
  prompt: string;
  music_length_ms?: number;
  composition_plan?: any;
  detailed?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: MusicGenerationRequest = await request.json();
    const { 
      prompt, 
      music_length_ms = 10000, 
      composition_plan,
      detailed = false
    } = body;

    // Validate required fields
    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Check if ElevenLabs API key is configured
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      console.error('ElevenLabs API key not found in environment variables');
      return NextResponse.json(
        { success: false, error: 'ElevenLabs API key not configured. Please add ELEVENLABS_API_KEY to your environment variables.' },
        { status: 500 }
      );
    }

    console.log('ElevenLabs API Key found:', apiKey.substring(0, 10) + '...');

    // Prepare request payload for ElevenLabs Music API
    const payload: any = {
      prompt: prompt.trim()
    };

    // Add optional parameters - ElevenLabs requires minimum 10 seconds
    if (music_length_ms !== undefined && music_length_ms >= 10000 && music_length_ms <= 300000) {
      payload.music_length_ms = music_length_ms;
    } else if (music_length_ms !== undefined && music_length_ms < 10000) {
      // Set minimum duration to 10 seconds if less is requested
      payload.music_length_ms = 10000;
    }
    
    if (composition_plan) {
      payload.composition_plan = composition_plan;
    }

    console.log('Sending request to ElevenLabs Music API:', {
      ...payload,
      prompt: prompt.substring(0, 100) + (prompt.length > 100 ? '...' : '')
    });

    // Determine the endpoint based on whether detailed response is requested
    const endpoint = detailed 
      ? 'https://api.elevenlabs.io/v1/music/compose-detailed'
      : 'https://api.elevenlabs.io/v1/music/compose';

    // Make request to ElevenLabs Music API
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs Music API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        payload: payload
      });
      
      let errorMessage = `ElevenLabs Music API Error: ${response.status} - ${response.statusText}`;
      
      // Try to parse error details
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error && errorData.error.message) {
          errorMessage = `ElevenLabs Music API Error: ${errorData.error.message}`;
        }
      } catch (e) {
        // If parsing fails, use the raw error text
        if (errorText) {
          errorMessage = `ElevenLabs Music API Error: ${errorText}`;
        }
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: errorMessage,
          details: errorText
        },
        { status: response.status }
      );
    }

    // Handle response based on whether detailed response was requested
    if (detailed) {
      const result = await response.json();
      const audioBuffer = Buffer.from(result.audio, 'base64');
      const base64Audio = result.audio;
      const audioUrl = `data:audio/mpeg;base64,${base64Audio}`;

      console.log('Successfully generated detailed music:', {
        promptLength: prompt.length,
        musicLengthMs: music_length_ms,
        audioSize: audioBuffer.byteLength,
        hasCompositionPlan: !!result.json?.composition_plan
      });

      return NextResponse.json({
        success: true,
        audioUrl,
        metadata: {
          prompt: prompt.trim(),
          music_length_ms,
          composition_plan: result.json?.composition_plan,
          song_metadata: result.json?.song_metadata,
          filename: result.filename,
          size: audioBuffer.byteLength
        }
      });
    } else {
      // Get the audio data for simple response
      const audioBuffer = await response.arrayBuffer();
      
      // Convert to base64 for client
      const base64Audio = Buffer.from(audioBuffer).toString('base64');
      const audioUrl = `data:audio/mpeg;base64,${base64Audio}`;

      console.log('Successfully generated music:', {
        promptLength: prompt.length,
        musicLengthMs: music_length_ms,
        audioSize: audioBuffer.byteLength
      });

      return NextResponse.json({
        success: true,
        audioUrl,
        metadata: {
          prompt: prompt.trim(),
          music_length_ms,
          size: audioBuffer.byteLength
        }
      });
    }

  } catch (error) {
    console.error('Music generation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
}
