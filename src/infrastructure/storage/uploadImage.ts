import { supabaseAdmin } from "@/infrastructure/supabase/supabase.client";

/**
 * Uploads a file to a Supabase storage bucket and returns the public URL.
 *
 * @param file - The File to upload
 * @param bucket - The Supabase bucket name
 * @param folder - Optional folder inside the bucket (e.g. "testimonials", "products")
 * @returns The public URL of the uploaded file
 */
export async function uploadImageToStorage(file: File, bucket: string, folder?: string): Promise<string> {
  if (!file) throw new Error("No file provided for upload");
  if (!bucket) throw new Error("Bucket name is required");

  // Add folder if provided
  const filePath = folder ? `${folder}/${Date.now()}-${file.name}` : `${Date.now()}-${file.name}`;

  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  const { error: uploadError } = await supabaseAdmin.storage
    .from(bucket)
    .upload(filePath, uint8Array, { contentType: file.type });

  if (uploadError) {
    throw new Error(`Failed to upload image: ${uploadError.message}`);
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);
  if (!data?.publicUrl) {
    throw new Error("Failed to get public URL from Supabase");
  }

  return data.publicUrl;
}
