"use server";

import { connectToDatabase } from "@/lib/mongodb";

export async function getAllImages() {
  try {
    const { db } = await connectToDatabase();

    const photos = await db
      .collection("photos")
      .find({})
      .sort({ createdAt: -1 })
      .project({
        beforePath: 1,
        afterPath: 1,
        beforeBrightness: 1,
        afterBrightness: 1,
      })
      .toArray();

    return {
      success: true,
      photos: photos.map((photo) => ({
        beforeUrl: photo.beforePath,
        afterUrl: photo.afterPath,
        beforeBrightness: photo.beforeBrightness,
        afterBrightness: photo.afterBrightness,
      })),
    };
  } catch (error) {
    console.error("Error fetching photo URLs:", error);
    return {
      success: false,
      error: "Failed to fetch photo URLs from database",
    };
  }
}
