export interface IImageStorageGateway {
  uploadImage(file: File, bucket: string, folder?: string): Promise<string>; // Returns the image URL
  deleteImage(url: string, bucket: string): Promise<void>; // Deletes the image
}
