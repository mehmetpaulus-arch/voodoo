import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { title, topic, style } = await request.json();

    if (!title || !topic) {
      return NextResponse.json(
        { error: 'Title and topic are required' },
        { status: 400 }
      );
    }

    const gammaApiKey = process.env.GAMMA_API_KEY;
    
    if (!gammaApiKey || gammaApiKey === 'your_gamma_api_key_here') {
      return NextResponse.json(
        { error: 'Gamma API key not configured' },
        { status: 500 }
      );
    }

    // Gamma API endpoint for creating presentations
    const gammaApiUrl = 'https://api.gamma.app/v1/generate';

    // Prepare the presentation data for Gamma API
    const presentationData = {
      prompt: `Create a professional presentation about: ${topic}. Title: ${title}. Style: ${style}`,
      type: 'presentation',
      title: title,
      description: topic
    };

    console.log('Sending request to Gamma API:', {
      url: gammaApiUrl,
      data: presentationData
    });

    // Call Gamma API
    const response = await fetch(gammaApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${gammaApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(presentationData),
    });

    console.log('Gamma API response status:', response.status);
    console.log('Gamma API response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gamma API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to create presentation with Gamma API' },
        { status: response.status }
      );
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      presentationId: result.id,
      presentationUrl: result.url || `https://gamma.app/p/${result.id}`,
      editUrl: result.editUrl || `https://gamma.app/edit/${result.id}`,
      title: title,
      status: 'created',
      createdAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error creating presentation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function getTemplateForStyle(style: string): string {
  const templateMap: { [key: string]: string } = {
    'professional': 'business',
    'creative': 'creative',
    'minimal': 'minimal',
    'modern': 'modern',
    'corporate': 'corporate'
  };
  return templateMap[style] || 'business';
}

function getThemeForStyle(style: string): string {
  const themeMap: { [key: string]: string } = {
    'professional': 'blue',
    'creative': 'purple',
    'minimal': 'gray',
    'modern': 'orange',
    'corporate': 'navy'
  };
  return themeMap[style] || 'blue';
}

function generatePresentationContent(topic: string, title: string): any {
  // Generate basic presentation structure
  return {
    slides: [
      {
        type: 'title',
        title: title,
        subtitle: `Eine Präsentation über ${topic}`,
        background: 'gradient'
      },
      {
        type: 'content',
        title: 'Überblick',
        content: `Diese Präsentation behandelt das Thema: ${topic}`,
        layout: 'text-image'
      },
      {
        type: 'content',
        title: 'Hauptpunkte',
        content: [
          'Wichtiger Punkt 1',
          'Wichtiger Punkt 2',
          'Wichtiger Punkt 3'
        ],
        layout: 'bullet-points'
      },
      {
        type: 'content',
        title: 'Fazit',
        content: 'Zusammenfassung der wichtigsten Erkenntnisse',
        layout: 'text-only'
      }
    ]
  };
}
