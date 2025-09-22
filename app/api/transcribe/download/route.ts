import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');
    const format = searchParams.get('format');

    console.log('Download request - path:', filePath, 'format:', format);

    if (!filePath || !format) {
      console.error('Missing parameters - path:', filePath, 'format:', format);
      return NextResponse.json({ error: 'Missing path or format parameter' }, { status: 400 });
    }

    const fullPath = path.join(process.cwd(), 'uploads', filePath);
    console.log('Full file path:', fullPath);
    
    try {
      const fileContent = await readFile(fullPath, 'utf-8');
      console.log('File content length:', fileContent.length);
      
      const mimeTypes: { [key: string]: string } = {
        'txt': 'text/plain'
      };

      const filename = path.basename(fullPath);
      console.log('Sending file:', filename, 'with mime type:', mimeTypes[format]);
      
      return new NextResponse(fileContent, {
        headers: {
          'Content-Type': mimeTypes[format] || 'text/plain',
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Content-Length': fileContent.length.toString(),
        },
      });
    } catch (error) {
      console.error('File read error:', error);
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}