import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import PageEditorLayout from "@/components/admin/PageEditorLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Edit, Plus, PlayCircle, Presentation, FileText, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";

export default function MaterialsPageEditor() {
  const materials = useQuery(api.content.getAllMaterials);
  const createMaterial = useMutation(api.content.createMaterial);
  const updateMaterial = useMutation(api.content.updateMaterial);
  const deleteMaterial = useMutation(api.content.deleteMaterial);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contentType: "video" as "video" | "presentation" | "pdf",
    url: "",
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return PlayCircle;
      case "presentation":
        return Presentation;
      case "pdf":
        return FileText;
      default:
        return FileText;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "video":
        return "Video";
      case "presentation":
        return "Presentation";
      case "pdf":
        return "PDF Document";
      default:
        return type;
    }
  };

  const handleOpenDialog = (material?: any) => {
    if (material) {
      setEditingMaterial(material);
      setFormData({
        title: material.title,
        description: material.description,
        contentType: material.contentType,
        url: material.url,
      });
    } else {
      setEditingMaterial(null);
      setFormData({
        title: "",
        description: "",
        contentType: "video",
        url: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.url) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingMaterial) {
        await updateMaterial({
          id: editingMaterial._id,
          ...formData,
          order: editingMaterial.order,
        });
        toast.success("Material updated successfully!");
      } else {
        const maxOrder = materials?.reduce(
          (max: number, material: any) => Math.max(max, material.order),
          0
        );
        await createMaterial({
          ...formData,
          order: (maxOrder || 0) + 1,
        });
        toast.success("Material added successfully!");
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to save material. Please try again.");
      console.error(error);
    }
  };

  const handleDelete = async (id: Id<"materials">) => {
    if (confirm("Are you sure you want to delete this material?")) {
      try {
        await deleteMaterial({ id });
        toast.success("Material deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete material.");
        console.error(error);
      }
    }
  };

  const handleMoveUp = async (material: any, index: number) => {
    if (index === 0) return; // Already at top

    const previousMaterial = materials![index - 1];

    try {
      // Swap orders
      await updateMaterial({
        id: material._id,
        title: material.title,
        description: material.description,
        contentType: material.contentType,
        url: material.url,
        order: previousMaterial.order,
      });

      await updateMaterial({
        id: previousMaterial._id,
        title: previousMaterial.title,
        description: previousMaterial.description,
        contentType: previousMaterial.contentType,
        url: previousMaterial.url,
        order: material.order,
      });

      toast.success("Material moved up");
    } catch (error) {
      toast.error("Failed to reorder material");
      console.error(error);
    }
  };

  const handleMoveDown = async (material: any, index: number) => {
    if (!materials || index === materials.length - 1) return; // Already at bottom

    const nextMaterial = materials[index + 1];

    try {
      // Swap orders
      await updateMaterial({
        id: material._id,
        title: material.title,
        description: material.description,
        contentType: material.contentType,
        url: material.url,
        order: nextMaterial.order,
      });

      await updateMaterial({
        id: nextMaterial._id,
        title: nextMaterial.title,
        description: nextMaterial.description,
        contentType: nextMaterial.contentType,
        url: nextMaterial.url,
        order: material.order,
      });

      toast.success("Material moved down");
    } catch (error) {
      toast.error("Failed to reorder material");
      console.error(error);
    }
  };

  return (
    <PageEditorLayout
      pageName="Materials Page"
      pageUrl="/materials"
      onSave={() => toast.info("Materials are saved automatically")}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Supporting Materials</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Add, edit, remove, or reorder materials that display live on the Materials page
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus size={16} className="mr-2" />
              Add Material
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingMaterial ? "Edit Material" : "Add New Material"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label>
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Concept Overview Video"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of this material"
                  rows={4}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>
                  Content Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.contentType}
                  onValueChange={(value: "video" | "presentation" | "pdf") =>
                    setFormData({ ...formData, contentType: value })
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video (YouTube, Vimeo, etc.)</SelectItem>
                    <SelectItem value="presentation">Presentation (Google Slides, etc.)</SelectItem>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>
                  URL <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  placeholder="https://..."
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.contentType === "video" && "YouTube, Vimeo, or direct video link"}
                  {formData.contentType === "presentation" && "Google Slides or PowerPoint Online link"}
                  {formData.contentType === "pdf" && "Direct link to PDF file"}
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingMaterial ? "Update" : "Add"} Material
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {materials?.map((material: any, index: number) => {
          const Icon = getIcon(material.contentType);
          return (
            <Card key={material._id} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMoveUp(material, index)}
                        disabled={index === 0}
                        className="h-8 w-8 p-0"
                        title="Move up"
                      >
                        <ArrowUp size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMoveDown(material, index)}
                        disabled={!materials || index === materials.length - 1}
                        className="h-8 w-8 p-0"
                        title="Move down"
                      >
                        <ArrowDown size={14} />
                      </Button>
                    </div>
                    <div className="text-center min-w-[40px]">
                      <div className="text-lg font-bold text-primary">#{index + 1}</div>
                      <div className="text-xs text-muted-foreground">Order</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="text-primary p-3 rounded-xl bg-primary/5 flex-shrink-0">
                      <Icon size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {material.title}
                      </h3>
                      <p className="text-xs text-secondary font-medium mb-2">
                        {getTypeLabel(material.contentType)}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {material.description}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono break-all">
                        {material.url}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenDialog(material)}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(material._id)}
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {(!materials || materials.length === 0) && (
        <Card className="border-dashed border-2 border-border">
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              No materials yet. Add your first material to get started.
            </p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus size={16} className="mr-2" />
              Add Material
            </Button>
          </CardContent>
        </Card>
      )}
    </PageEditorLayout>
  );
}
