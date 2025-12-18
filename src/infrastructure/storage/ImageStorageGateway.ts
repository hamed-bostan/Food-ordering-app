import { IImageStorageGateway } from "@/domain/interfaces/IImageStorageGateway";
import { supabaseAdmin } from "@/infrastructure/supabase/supabase.client";

export class ImageStorageGateway implements IImageStorageGateway {
  async uploadImage(file: File, bucket: string, folder?: string): Promise<string> {
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

  async deleteImage(url: string, bucket: string): Promise<void> {
    if (!url) throw new Error("No URL provided for deletion");
    if (!bucket) throw new Error("Bucket name is required");

    // Extract the file path from the public URL (assuming Supabase URL format: https://.../bucket/path/to/file)
    const filePath = url.split(`/${bucket}/`)[1];
    if (!filePath) throw new Error("Invalid URL format");

    const { error: deleteError } = await supabaseAdmin.storage.from(bucket).remove([filePath]);

    if (deleteError) {
      throw new Error(`Failed to delete image: ${deleteError.message}`);
    }
  }
}
