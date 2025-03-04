"use server";

import { writeFile } from "fs/promises";
import path from "path";
import { connectToDatabase } from "@/lib/mongodb";

export async function saveImages(
  beforeImgBase64: string,
  afterImgBase64: string,
  beforeFileName: string,
  afterFileName: string,
  beforeBrightness: number,
  afterBrightness: number
) {
  try {
    // Remove the data URL prefix to get just the base64 data
    const beforeBase64Data = beforeImgBase64.replace(
      /^data:image\/\w+;base64,/,
      ""
    );
    const afterBase64Data = afterImgBase64.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    // Convert base64 to buffer
    const beforeBuffer = Buffer.from(beforeBase64Data, "base64");
    const afterBuffer = Buffer.from(afterBase64Data, "base64");

    // Define file paths
    const publicDir = path.join(process.cwd(), "public");

    const beforePath = `/uploads/${beforeFileName}`;
    const afterPath = `/uploads/${afterFileName}`;

    // Write files to disk
    await writeFile(path.join(publicDir, beforePath), beforeBuffer);
    await writeFile(path.join(publicDir, afterPath), afterBuffer);

    // Save to database
    const { client } = await connectToDatabase();
    const db = client.db("face-recognition");

    await db.collection("photos").insertOne({
      beforePath,
      afterPath,
      createdAt: new Date(),
      beforeBrightness,
      afterBrightness,
    });

    return {
      success: true,
      beforePath,
      afterPath,
    };
  } catch (error) {
    console.error("Error saving images:", error);
    return {
      success: false,
      error: "画像の保存中にエラーが発生しました。",
    };
  }
}
