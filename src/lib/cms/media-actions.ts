"use server";

import { createClient } from "@/lib/supabase/server";
import { verifyAdminAccess } from "./auth";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

export async function uploadMedia(formData: FormData) {
  const { authorized, user } = await verifyAdminAccess();
  if (!authorized || !user) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  const isPublic = formData.get("isPublic") === "true";
  
  if (!file) throw new Error("No file provided");

  const supabase = await createClient();
  const bucketName = isPublic ? "public-assets" : "draft-assets";

  // Generate a unique file path to prevent overwrites
  const ext = file.name.split(".").pop();
  const uniqueId = crypto.randomBytes(8).toString("hex");
  const storagePath = `${uniqueId}.${ext}`;

  // Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(storagePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // Determine metadata
  const title = formData.get("title") as string || file.name;
  const caption = formData.get("caption") as string || null;
  const altText = formData.get("alt_text") as string || null;
  const dimensions = formData.get("dimensions") as string || null;

  // Insert into media_assets table
  const { error: dbError } = await supabase.from("media_assets").insert({
    file_name: file.name,
    storage_path: `${bucketName}/${storagePath}`, // store bucket + path
    mime_type: file.type,
    size_bytes: file.size,
    alt_text: altText,
    title: title,
    caption: caption,
    dimensions: dimensions,
    uploaded_by: user.id
  });

  if (dbError) {
    // Attempt to clean up storage if DB insert fails
    await supabase.storage.from(bucketName).remove([storagePath]);
    throw new Error(`Database insert failed: ${dbError.message}`);
  }

  revalidatePath("/admin/media");
  return { success: true, storagePath: `${bucketName}/${storagePath}` };
}

export async function deleteMedia(id: string, storagePath: string) {
  const { authorized } = await verifyAdminAccess();
  if (!authorized) throw new Error("Unauthorized");

  const supabase = await createClient();
  const [bucketName, ...pathParts] = storagePath.split("/");
  const filePath = pathParts.join("/");

  // Remove from storage
  const { error: storageError } = await supabase.storage.from(bucketName).remove([filePath]);
  if (storageError) {
    throw new Error(`Storage deletion failed: ${storageError.message}`);
  }

  // Remove from DB
  const { error: dbError } = await supabase.from("media_assets").delete().eq("id", id);
  if (dbError) {
    throw new Error(`Database deletion failed: ${dbError.message}`);
  }

  revalidatePath("/admin/media");
  return { success: true };
}

export async function updateMediaMetadata(id: string, metadata: { title?: string, caption?: string, alt_text?: string, dimensions?: string }) {
  const { authorized } = await verifyAdminAccess();
  if (!authorized) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { error } = await supabase.from("media_assets").update({
    ...metadata,
    updated_at: new Date().toISOString()
  }).eq("id", id);

  if (error) throw new Error(`Update failed: ${error.message}`);
  
  revalidatePath("/admin/media");
  return { success: true };
}
