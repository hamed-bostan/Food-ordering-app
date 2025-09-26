import { supabaseAdmin } from "@/infrastructure/supabase/supabase.client";

/**
 * Deletes an image from a Supabase storage bucket
 *
 * @param imageUrl - The full public URL of the image
 * @param bucket - The Supabase bucket name
 * @returns true if successful
 */
export async function deleteImageFromStorage(imageUrl: string, bucket: string): Promise<boolean> {
  if (!imageUrl) throw new Error("No image URL provided");
  if (!bucket) throw new Error("Bucket name is required");

  try {
    const url = new URL(imageUrl);

    // Supabase URLs look like:
    // /storage/v1/object/public/<bucket>/<path>
    const regex = new RegExp(`/storage/v1/object/public/${bucket}/(.*)`);
    const match = url.pathname.match(regex);
    if (!match || !match[1]) throw new Error("Invalid image URL format");

    const path = decodeURIComponent(match[1]);
    // e.g. "testimonials/1758607076896-Screenshot (1337).png"

    console.log("🗑️ Deleting from Supabase:", { bucket, path });

    const { error } = await supabaseAdmin.storage.from(bucket).remove([path]);
    if (error) throw new Error(`Supabase delete failed: ${error.message}`);

    return true;
  } catch (err) {
    console.error("deleteImageFromStorage error:", err);
    throw new Error("Failed to delete image from storage");
  }
}
