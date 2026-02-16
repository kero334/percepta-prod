import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import PageEditorLayout from "@/components/admin/PageEditorLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface GenericPageEditorProps {
  pageId: string;
  pageName: string;
  pageUrl: string;
  sections: {
    id: string;
    label: string;
    type: "text" | "textarea" | "url";
    placeholder?: string;
  }[];
}

export default function GenericPageEditor({
  pageId,
  pageName,
  pageUrl,
  sections,
}: GenericPageEditorProps) {
  const pageContent = useQuery(api.content.getPageContent, { pageId });
  const updateSection = useMutation(api.content.updateSectionContent);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (pageContent) {
      const initialData: Record<string, string> = {};
      sections.forEach((section) => {
        initialData[section.id] = pageContent[section.id] || "";
      });
      setFormData(initialData);
    }
  }, [pageContent, sections]);

  const handleSave = async () => {
    try {
      await Promise.all(
        sections.map((section) =>
          updateSection({
            pageId,
            sectionId: section.id,
            content: formData[section.id] || "",
          })
        )
      );
      toast.success(`${pageName} updated successfully!`);
    } catch (error) {
      toast.error("Failed to save changes");
      console.error(error);
    }
  };

  const handleChange = (sectionId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [sectionId]: value }));
  };

  return (
    <PageEditorLayout pageName={pageName} pageUrl={pageUrl} onSave={handleSave}>
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Edit Page Content</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Update the content for {pageName}. Changes will be reflected on the public page.
          </p>
        </div>

        {sections.map((section) => (
          <Card key={section.id} className="border-border">
            <CardContent className="p-6">
              <div>
                <Label htmlFor={section.id} className="text-base font-semibold">
                  {section.label}
                </Label>
                {section.type === "textarea" ? (
                  <Textarea
                    id={section.id}
                    value={formData[section.id] || ""}
                    onChange={(e) => handleChange(section.id, e.target.value)}
                    placeholder={section.placeholder}
                    rows={6}
                    className="mt-2"
                  />
                ) : (
                  <Input
                    id={section.id}
                    type={section.type === "url" ? "url" : "text"}
                    value={formData[section.id] || ""}
                    onChange={(e) => handleChange(section.id, e.target.value)}
                    placeholder={section.placeholder}
                    className="mt-2"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="bg-muted/30 border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground">
            💡 Note: This is a simplified editor. For more advanced content management,
            additional fields can be added in future updates.
          </p>
        </div>
      </div>
    </PageEditorLayout>
  );
}
