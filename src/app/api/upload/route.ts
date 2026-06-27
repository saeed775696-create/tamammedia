import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
  try {
    const credentials = JSON.parse(process.env.GDRIVE_CREDENTIALS!);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    // رفع الملف إلى Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: `${Date.now()}_${file.name}`,
        parents: ["17YfGRpiAtlNj64RELZcV3UlpbwSVeJKm?usp=sharing"],
      },
      media: {
        mimeType: file.type,
        body: buffer,
      },
    });

    const fileId = response.data.id;

    // جعل الملف عامًا
    await drive.permissions.create({
      fileId: fileId!,
      requestBody: { role: "reader", type: "anyone" },
    });

    // الحصول على الرابط المباشر
    const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

    return NextResponse.json({ url: directUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
