"use server";

import { connectToDatabase } from "@/lib/mongodb";

export async function getAllImages() {
  try {
    const { client } = await connectToDatabase();
    const db = client.db("face-recognition");

    const photos = await db
      .collection("photos")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      photos: photos.map((photo) => {
        return {
          beforeUrl: photo.beforePath,
          afterUrl: photo.afterPath,
          beforeBrightness: photo.beforeBrightness,
          afterBrightness: photo.afterBrightness,
          createdAt: photo.createdAt,
        };
      }),
    };
  } catch (error) {
    console.error("Error fetching photo URLs:", error);
    const errorMessage =
      error instanceof Error
        ? `Failed to fetch photo URLs: ${error.message}`
        : "Failed to fetch photo URLs from database";

    return {
      success: false,
      error: errorMessage,
    };
  }
}
