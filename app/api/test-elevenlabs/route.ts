import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if ElevenLabs API key is configured
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ElevenLabs API key not configured',
          message: 'Please add ELEVENLABS_API_KEY to your .env.local file'
        },
        { status: 500 }
      );
    }

    // Test with minimal payload
    const testPayload = {
      text: "A simple test sound"
    };

    console.log('Testing ElevenLabs API with payload:', testPayload);

    const response = await fetch('https://api.elevenlabs.io/v1/sound-generation', {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload)
    });

    console.log('ElevenLabs API Response Status:', response.status);
    console.log('ElevenLabs API Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API Error Response:', errorText);
      
      return NextResponse.json(
        { 
          success: false, 
          error: `ElevenLabs API Error: ${response.status} - ${response.statusText}`,
          details: errorText,
          apiKeyConfigured: true,
          apiKeyPrefix: apiKey.substring(0, 10) + '...'
        },
        { status: response.status }
      );
    }

    // If successful, get the audio data
    const audioBuffer = await response.arrayBuffer();
    
    return NextResponse.json({
      success: true,
      message: 'ElevenLabs API is working correctly',
      audioSize: audioBuffer.byteLength,
      apiKeyConfigured: true,
      apiKeyPrefix: apiKey.substring(0, 10) + '...'
    });

  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        apiKeyConfigured: !!process.env.ELEVENLABS_API_KEY
      },
      { status: 500 }
    );
  }
}
