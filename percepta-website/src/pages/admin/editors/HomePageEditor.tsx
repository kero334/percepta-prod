import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PageEditorLayout from "@/components/admin/PageEditorLayout";
import SectionEditor from "@/components/admin/SectionEditor";
import EditableField from "@/components/admin/EditableField";
import { toast } from "sonner";

export default function HomePageEditor() {
  const pageContent = useQuery(api.content.getPageContent, { pageId: "home" });
  const updateContent = useMutation(api.content.updateSectionContent);

  const [hero, setHero] = useState({
    headline: "Cognitive AI that prevents industrial accidents",
    subheadline:
      "We build an AI intelligence layer that detects hazardous proximity between workers and industrial equipment and recommends preventive actions in real time.",
    primaryCtaText: "Request a Pilot",
    primaryCtaLink: "/pilot",
    secondaryCtaText: "Download One-Pager",
    secondaryCtaLink: "#",
    imageUrl: "",
  });

  const [valueBlock1, setValueBlock1] = useState({
    title: "Perceive",
    description:
      "Detect hazardous proximity between workers and industrial equipment using advanced computer vision",
  });

  const [valueBlock2, setValueBlock2] = useState({
    title: "Understand",
    description:
      "Reason about risk and context, not just objects. Our AI understands dangerous situations before they escalate",
  });

  const [valueBlock3, setValueBlock3] = useState({
    title: "Prevent",
    description:
      "Recommend immediate corrective actions in real-time to prevent accidents and protect workers",
  });

  const [cta, setCta] = useState({
    headline: "Ready to make your facility safer?",
    description:
      "Join our pilot program and validate Percepta's effectiveness in your industrial environment",
    buttonText: "Request a Pilot Program",
    buttonLink: "/pilot",
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (pageContent) {
      if (pageContent.hero) setHero(pageContent.hero);
      if (pageContent.valueBlock1) setValueBlock1(pageContent.valueBlock1);
      if (pageContent.valueBlock2) setValueBlock2(pageContent.valueBlock2);
      if (pageContent.valueBlock3) setValueBlock3(pageContent.valueBlock3);
      if (pageContent.cta) setCta(pageContent.cta);
    }
  }, [pageContent]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await Promise.all([
        updateContent({ pageId: "home", sectionId: "hero", content: hero }),
        updateContent({
          pageId: "home",
          sectionId: "valueBlock1",
          content: valueBlock1,
        }),
        updateContent({
          pageId: "home",
          sectionId: "valueBlock2",
          content: valueBlock2,
        }),
        updateContent({
          pageId: "home",
          sectionId: "valueBlock3",
          content: valueBlock3,
        }),
        updateContent({ pageId: "home", sectionId: "cta", content: cta }),
      ]);

      toast.success("Home page content saved successfully!");
    } catch (error) {
      toast.error("Failed to save changes. Please try again.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PageEditorLayout
      pageName="Home Page"
      pageUrl="/"
      onSave={handleSave}
      isSaving={isSaving}
    >
      <SectionEditor title="Hero Section" defaultExpanded>
        <EditableField
          label="Headline"
          value={hero.headline}
          onChange={(value) => setHero({ ...hero, headline: value })}
          placeholder="Main headline"
          helperText="This headline appears at the top of the homepage"
        />
        <EditableField
          label="Subheadline"
          value={hero.subheadline}
          onChange={(value) => setHero({ ...hero, subheadline: value })}
          type="textarea"
          placeholder="Supporting text"
          helperText="Describes what Percepta does"
        />
        <EditableField
          label="Primary Button Text"
          value={hero.primaryCtaText}
          onChange={(value) => setHero({ ...hero, primaryCtaText: value })}
          placeholder="Button text"
        />
        <EditableField
          label="Primary Button Link"
          value={hero.primaryCtaLink}
          onChange={(value) => setHero({ ...hero, primaryCtaLink: value })}
          placeholder="/pilot"
        />
        <EditableField
          label="Secondary Button Text"
          value={hero.secondaryCtaText}
          onChange={(value) => setHero({ ...hero, secondaryCtaText: value })}
          placeholder="Button text"
        />
        <EditableField
          label="Secondary Button Link"
          value={hero.secondaryCtaLink}
          onChange={(value) => setHero({ ...hero, secondaryCtaLink: value })}
          placeholder="Link or file URL"
        />
        <EditableField
          label="Hero Image URL (optional)"
          value={hero.imageUrl}
          onChange={(value) => setHero({ ...hero, imageUrl: value })}
          type="url"
          placeholder="https://example.com/image.png"
        />
      </SectionEditor>

      <SectionEditor title="Value Block 1: Perceive">
        <EditableField
          label="Title"
          value={valueBlock1.title}
          onChange={(value) => setValueBlock1({ ...valueBlock1, title: value })}
          placeholder="Block title"
        />
        <EditableField
          label="Description"
          value={valueBlock1.description}
          onChange={(value) =>
            setValueBlock1({ ...valueBlock1, description: value })
          }
          type="textarea"
          placeholder="Block description"
        />
      </SectionEditor>

      <SectionEditor title="Value Block 2: Understand">
        <EditableField
          label="Title"
          value={valueBlock2.title}
          onChange={(value) => setValueBlock2({ ...valueBlock2, title: value })}
          placeholder="Block title"
        />
        <EditableField
          label="Description"
          value={valueBlock2.description}
          onChange={(value) =>
            setValueBlock2({ ...valueBlock2, description: value })
          }
          type="textarea"
          placeholder="Block description"
        />
      </SectionEditor>

      <SectionEditor title="Value Block 3: Prevent">
        <EditableField
          label="Title"
          value={valueBlock3.title}
          onChange={(value) => setValueBlock3({ ...valueBlock3, title: value })}
          placeholder="Block title"
        />
        <EditableField
          label="Description"
          value={valueBlock3.description}
          onChange={(value) =>
            setValueBlock3({ ...valueBlock3, description: value })
          }
          type="textarea"
          placeholder="Block description"
        />
      </SectionEditor>

      <SectionEditor title="Call-to-Action Section">
        <EditableField
          label="Headline"
          value={cta.headline}
          onChange={(value) => setCta({ ...cta, headline: value })}
          placeholder="CTA headline"
        />
        <EditableField
          label="Description"
          value={cta.description}
          onChange={(value) => setCta({ ...cta, description: value })}
          type="textarea"
          placeholder="CTA description"
        />
        <EditableField
          label="Button Text"
          value={cta.buttonText}
          onChange={(value) => setCta({ ...cta, buttonText: value })}
          placeholder="Button text"
        />
        <EditableField
          label="Button Link"
          value={cta.buttonLink}
          onChange={(value) => setCta({ ...cta, buttonLink: value })}
          placeholder="/pilot"
        />
      </SectionEditor>
    </PageEditorLayout>
  );
}
