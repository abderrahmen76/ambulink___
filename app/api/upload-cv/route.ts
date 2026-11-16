import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { getCvExtension, MAX_CV_SIZE } from '../../cv-upload';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('cv');

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: 'CV manquant.' }, { status: 400 });
    }

    if (file.size > MAX_CV_SIZE) {
      return NextResponse.json({ error: 'Le CV doit faire 4 Mo maximum.' }, { status: 413 });
    }

    const extension = getCvExtension(file.name);
    if (!extension) {
      return NextResponse.json({ error: 'Formats acceptés : PDF, DOC et DOCX.' }, { status: 400 });
    }

    const pathname = `internships/${crypto.randomUUID()}.${extension}`;
    const blob = await put(pathname, file, {
      access: 'private',
      contentType: 'application/octet-stream',
    });

    return NextResponse.json({ success: true, pathname: blob.pathname });
  } catch (error) {
    console.error('[CV upload] Upload failed:', error);
    return NextResponse.json(
      { error: 'Impossible de sauvegarder le CV. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}
