import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.OPENAI_API_KEY;
const BASE_URL = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
const MODEL = process.env.ZDF_ASSISTANT_MODEL || "gpt-4o";

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  image?: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
}

export async function POST(request: NextRequest) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is missing. Please add OPENAI_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    if (API_KEY === 'sk-placeholder-key-replace-with-real-key' || API_KEY.includes('your-api-key-here')) {
      return NextResponse.json(
        { error: 'Please replace the placeholder API key in .env.local with your actual OpenAI API key from https://platform.openai.com/account/api-keys' },
        { status: 401 }
      );
    }

    // Check if request is FormData (with image) or JSON
    const contentType = request.headers.get('content-type');
    let messages: ChatMessage[];
    let model = "gpt-4o";
    let temperature = 1.0;

    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      const messagesStr = formData.get('messages') as string;
      messages = JSON.parse(messagesStr);
      model = (formData.get('model') as string) || "gpt-4o";
      temperature = parseFloat((formData.get('temperature') as string) || "1.0");
      
      // Handle image file if present
      const imageFile = formData.get('image') as File;
      if (imageFile) {
        console.log('Processing image file:', {
          name: imageFile.name,
          type: imageFile.type,
          size: imageFile.size
        });
        
        const arrayBuffer = await imageFile.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        const mimeType = imageFile.type;
        
        // Add image to the last user message
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.role === 'user') {
          lastMessage.image = `data:${mimeType};base64,${base64}`;
          console.log('Image added to message, base64 length:', base64.length);
        }
      }
    } else {
      const body: ChatRequest = await request.json();
      messages = body.messages;
      model = body.model || "gpt-4o";
      temperature = body.temperature || 1.0;
    }

    // Process messages to handle images
    const processedMessages = messages.map(msg => {
      if (msg.image && msg.role === 'user') {
        return {
          role: msg.role,
          content: [
            {
              type: "text",
              text: msg.content
            },
            {
              type: "image_url",
              image_url: {
                url: msg.image
              }
            }
          ]
        };
      }
      return {
        role: msg.role,
        content: msg.content
      };
    });

    const payload: any = {
      model: model || "gpt-4o",
      messages: processedMessages,
      max_tokens: 2000,
      stream: false
    };

    // Add temperature if specified
    if (temperature !== undefined && temperature !== null) {
      payload.temperature = temperature;
    }

    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`HTTP ${response.status} ${response.statusText}: ${errorText}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: `Chat API error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your API key and internet connection.` },
      { status: 500 }
    );
  }
}