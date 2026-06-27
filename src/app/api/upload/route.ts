import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    // ImgBB API
    const imgbbForm = new FormData();
    imgbbForm.append("image", file);

    const res = await fetch(
      "https://api.imgbb.com/1/upload?key=28984d6b0dd7f0cf395e1db0caa3a0f0",
      {
        method: "POST",
        body: imgbbForm,
      },
    );

    const data = await res.json();
    if (data.success) {
      return NextResponse.json({ url: data.data.url });
    } else {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
