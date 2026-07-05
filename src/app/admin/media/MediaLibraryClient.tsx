"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadMedia, deleteMedia, updateMediaMetadata } from "@/lib/cms/media-actions";
import * as Icons from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function MediaLibraryClient({ initialAssets }: { initialAssets: any[] }) {
  const [assets, setAssets] = useState(initialAssets);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null);

  const supabase = createClient();

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await uploadMedia(formData);
      // Optimistically reload the page or we just let Next.js revalidate
      window.location.reload();
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, storagePath: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;
    try {
      await deleteMedia(id, storagePath);
      setAssets(assets.filter(a => a.id !== id));
      if (selectedAsset?.id === id) setSelectedAsset(null);
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  const handleUpdateMeta = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedAsset) return;
    const formData = new FormData(e.currentTarget);
    const updates = {
      title: formData.get("title") as string,
      caption: formData.get("caption") as string,
      alt_text: formData.get("alt_text") as string,
      dimensions: formData.get("dimensions") as string,
    };
    try {
      await updateMediaMetadata(selectedAsset.id, updates);
      setAssets(assets.map(a => a.id === selectedAsset.id ? { ...a, ...updates } : a));
      alert("Updated successfully");
    } catch (err: any) {
      alert("Update failed: " + err.message);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getPublicUrl = (storagePath: string) => {
    const [bucket, ...rest] = storagePath.split("/");
    return supabase.storage.from(bucket).getPublicUrl(rest.join("/")).data.publicUrl;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Upload & Library Column */}
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-[#121214] border border-border/40 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Upload New Asset</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white mb-1 block">File</label>
                <Input type="file" name="file" required className="bg-[#09090b] text-white border-border/40" />
              </div>
              <div>
                <label className="text-sm font-medium text-white mb-1 block">Bucket</label>
                <select name="isPublic" className="w-full h-10 rounded-md border border-border/40 bg-[#09090b] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="true">public-assets</option>
                  <option value="false">draft-assets</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white mb-1 block">Title</label>
                <Input type="text" name="title" placeholder="Optional title" className="bg-[#09090b] text-white border-border/40" />
              </div>
              <div>
                <label className="text-sm font-medium text-white mb-1 block">Alt Text</label>
                <Input type="text" name="alt_text" placeholder="Optional alt text" className="bg-[#09090b] text-white border-border/40" />
              </div>
            </div>

            <Button type="submit" disabled={isUploading} className="w-full bg-primary text-black hover:bg-primary/90">
              {isUploading ? "Uploading..." : "Upload Asset"}
              <Icons.Upload className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </div>

        <div className="bg-[#121214] border border-border/40 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Asset Library</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {assets.map(asset => (
              <div 
                key={asset.id} 
                onClick={() => setSelectedAsset(asset)}
                className={`relative group aspect-square rounded-lg border overflow-hidden cursor-pointer ${selectedAsset?.id === asset.id ? 'border-primary ring-2 ring-primary/20' : 'border-border/40 hover:border-white/20'}`}
              >
                {asset.mime_type?.startsWith('image/') ? (
                  <img src={getPublicUrl(asset.storage_path)} alt={asset.title} className="object-cover w-full h-full" />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full bg-[#09090b]">
                    <Icons.FileText className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground truncate px-2">{asset.file_name}</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="destructive" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); handleDelete(asset.id, asset.storage_path); }}>
                    <Icons.Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm p-2 text-xs text-white truncate">
                  {asset.title || asset.file_name}
                </div>
              </div>
            ))}
            {assets.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No media assets found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metadata Panel Column */}
      <div className="space-y-8">
        <div className="bg-[#121214] border border-border/40 rounded-xl p-6 sticky top-8">
          <h2 className="text-xl font-bold text-white mb-4">Asset Metadata</h2>
          {selectedAsset ? (
            <form onSubmit={handleUpdateMeta} className="space-y-4">
              {/* Preview */}
              <div className="aspect-video rounded-lg overflow-hidden bg-[#09090b] border border-border/40 mb-4 flex items-center justify-center">
                 {selectedAsset.mime_type?.startsWith('image/') ? (
                  <img src={getPublicUrl(selectedAsset.storage_path)} alt={selectedAsset.title} className="max-h-full object-contain" />
                 ) : (
                  <Icons.File className="w-12 h-12 text-muted-foreground" />
                 )}
              </div>

              {/* Read Only Info */}
              <div className="text-sm text-muted-foreground space-y-1 mb-4 p-3 bg-[#09090b] rounded-lg border border-border/40">
                <div className="flex justify-between"><span className="text-white">File Name:</span> <span className="truncate ml-2">{selectedAsset.file_name}</span></div>
                <div className="flex justify-between"><span className="text-white">Bucket:</span> <span>{selectedAsset.storage_path.split('/')[0]}</span></div>
                <div className="flex justify-between"><span className="text-white">Size:</span> <span>{formatBytes(selectedAsset.size_bytes)}</span></div>
                <div className="flex justify-between"><span className="text-white">MIME Type:</span> <span>{selectedAsset.mime_type}</span></div>
                <div className="flex justify-between"><span className="text-white">Uploaded By:</span> <span className="truncate ml-2 text-xs">{selectedAsset.uploaded_by}</span></div>
                <div className="flex justify-between mt-2 pt-2 border-t border-border/40">
                  <a href={getPublicUrl(selectedAsset.storage_path)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center">
                    Copy Public URL <Icons.ExternalLink className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Editable Meta */}
              <div>
                <label className="text-xs font-medium text-white mb-1 block">Title</label>
                <Input type="text" name="title" defaultValue={selectedAsset.title || ''} className="bg-[#09090b] text-white border-border/40 h-8 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-white mb-1 block">Caption</label>
                <Input type="text" name="caption" defaultValue={selectedAsset.caption || ''} className="bg-[#09090b] text-white border-border/40 h-8 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-white mb-1 block">Alt Text</label>
                <Input type="text" name="alt_text" defaultValue={selectedAsset.alt_text || ''} className="bg-[#09090b] text-white border-border/40 h-8 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-white mb-1 block">Dimensions</label>
                <Input type="text" name="dimensions" defaultValue={selectedAsset.dimensions || ''} placeholder="e.g. 1920x1080" className="bg-[#09090b] text-white border-border/40 h-8 text-sm" />
              </div>

              <Button type="submit" size="sm" className="w-full bg-primary/20 text-primary hover:bg-primary/30 border border-primary/20 mt-4">
                Save Metadata
              </Button>
            </form>
          ) : (
            <div className="text-sm text-muted-foreground text-center py-12">
              Select an asset from the library to view and edit its metadata.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
