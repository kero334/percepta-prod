import GenericPageEditor from "./GenericPageEditor";

export default function WhatWeDoPageEditor() {
  return (
    <GenericPageEditor
      pageId="what-we-do"
      pageName="What We Do"
      pageUrl="/what-we-do"
      sections={[
        {
          id: "hero_title",
          label: "Page Title",
          type: "text",
          placeholder: "What We Do",
        },
        {
          id: "hero_subtitle",
          label: "Subtitle",
          type: "textarea",
          placeholder: "Brief description of what Percepta does...",
        },
        {
          id: "capabilities_title",
          label: "Core Capabilities Section Title",
          type: "text",
          placeholder: "Core Capabilities",
        },
        {
          id: "capabilities_subtitle",
          label: "Core Capabilities Subtitle",
          type: "textarea",
          placeholder: "Three integrated systems working together...",
        },
        {
          id: "principles_title",
          label: "Key Principles Section Title",
          type: "text",
          placeholder: "Key Principles",
        },
        {
          id: "principles_subtitle",
          label: "Key Principles Subtitle",
          type: "textarea",
          placeholder: "Built on a foundation of transparency...",
        },
        {
          id: "software_first_title",
          label: "Software-First Section Title",
          type: "text",
          placeholder: "Why Software-First?",
        },
        {
          id: "software_first_description",
          label: "Software-First Description",
          type: "textarea",
          placeholder: "Traditional safety systems rely on physical barriers...",
        },
      ]}
    />
  );
}
