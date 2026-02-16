import GenericPageEditor from "./GenericPageEditor";

export default function UseCasePageEditor() {
  return (
    <GenericPageEditor
      pageId="use-case"
      pageName="Use Case (H-PROX)"
      pageUrl="/use-case"
      sections={[
        {
          id: "hero_title",
          label: "Page Title",
          type: "text",
          placeholder: "Hazardous Proximity Detection",
        },
        {
          id: "hero_subtitle",
          label: "Subtitle",
          type: "text",
          placeholder: "H-PROX",
        },
        {
          id: "problem_title",
          label: "Problem Section Title",
          type: "text",
          placeholder: "The Problem",
        },
        {
          id: "problem_description",
          label: "Problem Description",
          type: "textarea",
          placeholder: "Workers are frequently injured when entering unsafe proximity zones...",
        },
        {
          id: "solution_title",
          label: "Solution Section Title",
          type: "text",
          placeholder: "Percepta's Solution",
        },
        {
          id: "solution_description",
          label: "Solution Description",
          type: "textarea",
          placeholder: "Detects when a worker approaches hazardous machinery...",
        },
        {
          id: "target_environments_title",
          label: "Target Environments Section Title",
          type: "text",
          placeholder: "Target Environments",
        },
        {
          id: "success_metrics_title",
          label: "Success Metrics Section Title",
          type: "text",
          placeholder: "Success Metrics",
        },
      ]}
    />
  );
}
