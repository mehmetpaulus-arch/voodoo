import { NextRequest, NextResponse } from 'next/server';

interface CompositionPlanRequest {
  prompt: string;
  music_length_ms?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: CompositionPlanRequest = await request.json();
    const { 
      prompt, 
      music_length_ms = 10000
    } = body;

    // Validate required fields
    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Check if ZDF Music API key is configured
    const apiKey = process.env.ZDF_MUSIC_API_KEY;
    if (!apiKey) {
      console.error('ZDF Music API key not found in environment variables');
      return NextResponse.json(
        { success: false, error: 'ZDF Music API key not configured. Please add ZDF_MUSIC_API_KEY to your environment variables.' },
        { status: 500 }
      );
    }

    console.log('ZDF Music API Key found:', apiKey.substring(0, 10) + '...');

    // Prepare request payload for ZDF composition plan generation
    const payload: any = {
      prompt: prompt.trim()
    };

    // Extended duration limit for ZDF - up to 5 minutes
    if (music_length_ms !== undefined && music_length_ms >= 1000 && music_length_ms <= 300000) {
      payload.music_length_ms = music_length_ms;
    }

    console.log('Sending request to ElevenLabs Music Composition Plan API:', {
      ...payload,
      prompt: prompt.substring(0, 100) + (prompt.length > 100 ? '...' : '')
    });

    // Make request to ElevenLabs Music Composition Plan API
    const response = await fetch('https://api.elevenlabs.io/v1/music/composition-plan', {
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

    // Get the composition plan data
    const compositionPlan = await response.json();

    console.log('Successfully generated composition plan:', {
      promptLength: prompt.length,
      musicLengthMs: music_length_ms,
      sectionsCount: compositionPlan.sections?.length || 0
    });

    return NextResponse.json({
      success: true,
      composition_plan: compositionPlan,
      metadata: {
        prompt: prompt.trim(),
        music_length_ms,
        sections_count: compositionPlan.sections?.length || 0
      }
    });

  } catch (error) {
    console.error('Composition plan generation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
}
