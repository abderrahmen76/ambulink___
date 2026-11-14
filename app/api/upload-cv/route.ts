import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('cv') as File;
    const email = formData.get('email') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Read file content
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create filename: email_timestamp_originalname
    const timestamp = Date.now();
    const sanitizedEmail = email.replace(/[^a-z0-9]/gi, '_');
    const filename = `${sanitizedEmail}_${timestamp}_${file.name}`;
    const dropboxPath = `/Internships/${filename}`;

    // Upload to Dropbox
    const dropboxResponse = await fetch('https://content.dropboxapi.com/2/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DROPBOX_TOKEN}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: dropboxPath,
          mode: 'add',
          autorename: true,
          mute: false,
          strict_conflict: false,
        }),
        'Content-Type': 'application/octet-stream',
      },
      body: buffer,
    });

    if (!dropboxResponse.ok) {
      const errorData = await dropboxResponse.json();
      console.error('Dropbox upload error:', errorData);
      return NextResponse.json(
        { error: 'Failed to upload to Dropbox', details: errorData },
        { status: 500 }
      );
    }

    const dropboxResult = await dropboxResponse.json();
    console.log('File uploaded to Dropbox:', dropboxResult);

    return NextResponse.json({
      success: true,
      filename: filename,
      dropboxPath: dropboxPath,
      message: 'File uploaded successfully',
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    );
  }
}
