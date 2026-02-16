import GenericPageEditor from "./GenericPageEditor";

export default function HowItWorksPageEditor() {
  return (
    <GenericPageEditor
      pageId="how-it-works"
      pageName="How It Works"
      pageUrl="/how-it-works"
      sections={[
        {
          id: "hero_title",
          label: "Page Title",
          type: "text",
          placeholder: "How It Works",
        },
        {
          id: "hero_subtitle",
          label: "Subtitle",
          type: "textarea",
          placeholder: "From camera input to actionable safety recommendations...",
        },
        {
          id: "pipeline_title",
          label: "Processing Pipeline Section Title",
          type: "text",
          placeholder: "Processing Pipeline",
        },
        {
          id: "pipeline_subtitle",
          label: "Processing Pipeline Subtitle",
          type: "text",
          placeholder: "Six-stage intelligent safety system",
        },
        {
          id: "deployment_title",
          label: "Deployment Options Section Title",
          type: "text",
          placeholder: "Deployment Options",
        },
        {
          id: "deployment_subtitle",
          label: "Deployment Options Subtitle",
          type: "textarea",
          placeholder: "Flexible architecture for your security and performance needs",
        },
        {
          id: "explainability_title",
          label: "Explainability Section Title",
          type: "text",
          placeholder: "Why Explainability Matters",
        },
        {
          id: "explainability_description",
          label: "Explainability Description",
          type: "textarea",
          placeholder: "Unlike black-box AI systems, Percepta provides clear reasoning...",
        },
      ]}
    />
  );
}
