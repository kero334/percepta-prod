import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import PageEditorLayout from "@/components/admin/PageEditorLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Edit, Plus, X } from "lucide-react";
import { toast } from "sonner";

export default function TeamPageEditor() {
  const teamMembers = useQuery(api.content.getAllTeamMembers);
  const createMember = useMutation(api.content.createTeamMember);
  const updateMember = useMutation(api.content.updateTeamMember);
  const deleteMember = useMutation(api.content.deleteTeamMember);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    expertise: [] as string[],
    imageUrl: "",
    linkedinUrl: "",
    websiteUrl: "",
  });
  const [currentExpertise, setCurrentExpertise] = useState("");

  const handleOpenDialog = (member?: any) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        bio: member.bio,
        expertise: member.expertise || [],
        imageUrl: member.imageUrl || "",
        linkedinUrl: member.linkedinUrl || "",
        websiteUrl: member.websiteUrl || "",
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: "",
        role: "",
        bio: "",
        expertise: [],
        imageUrl: "",
        linkedinUrl: "",
        websiteUrl: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleAddExpertise = () => {
    if (currentExpertise.trim()) {
      setFormData({
        ...formData,
        expertise: [...formData.expertise, currentExpertise.trim()],
      });
      setCurrentExpertise("");
    }
  };

  const handleRemoveExpertise = (index: number) => {
    setFormData({
      ...formData,
      expertise: formData.expertise.filter((_, i) => i !== index),
    });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.role || !formData.bio) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingMember) {
        await updateMember({
          id: editingMember._id,
          ...formData,
          order: editingMember.order,
        });
        toast.success("Team member updated successfully!");
      } else {
        const maxOrder = teamMembers?.reduce(
          (max: number, member: any) => Math.max(max, member.order),
          0
        );
        await createMember({
          ...formData,
          order: (maxOrder || 0) + 1,
        });
        toast.success("Team member added successfully!");
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to save team member. Please try again.");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      try {
        await deleteMember({ id: id as any });
        toast.success("Team member deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete team member.");
        console.error(error);
      }
    }
  };

  return (
    <PageEditorLayout
      pageName="Team Page"
      pageUrl="/team"
      onSave={() => toast.info("Team members are saved automatically")}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Team Members</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Add, edit, or remove team members
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus size={16} className="mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingMember ? "Edit Team Member" : "Add New Team Member"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label>
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Full name"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>
                  Role / Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  placeholder="e.g., Co-Founder & CEO"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>
                  Bio <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="1-2 sentences about this person"
                  rows={4}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Areas of Expertise</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={currentExpertise}
                    onChange={(e) => setCurrentExpertise(e.target.value)}
                    placeholder="e.g., Machine Learning"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddExpertise();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddExpertise}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.expertise.map((exp, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm"
                    >
                      <span>{exp}</span>
                      <button
                        onClick={() => handleRemoveExpertise(index)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Profile Image URL</Label>
                <Input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="https://example.com/photo.jpg"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>LinkedIn URL</Label>
                <Input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedinUrl: e.target.value })
                  }
                  placeholder="https://linkedin.com/in/..."
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Personal Website URL</Label>
                <Input
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, websiteUrl: e.target.value })
                  }
                  placeholder="https://example.com"
                  className="mt-2"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingMember ? "Update" : "Add"} Team Member
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {teamMembers?.map((member: any) => (
          <Card key={member._id} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-secondary">
                    {member.role}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenDialog(member)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(member._id)}
                  >
                    <Trash2 size={16} className="text-destructive" />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {member.bio}
              </p>

              {member.expertise && member.expertise.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((exp: string, index: number) => (
                    <span
                      key={index}
                      className="text-xs bg-muted px-2 py-1 rounded-full"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {(!teamMembers || teamMembers.length === 0) && (
        <Card className="border-dashed border-2 border-border">
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              No team members yet. Add your first team member to get started.
            </p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus size={16} className="mr-2" />
              Add Team Member
            </Button>
          </CardContent>
        </Card>
      )}
    </PageEditorLayout>
  );
}
