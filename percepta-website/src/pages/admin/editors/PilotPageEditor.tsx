import GenericPageEditor from "./GenericPageEditor";

export default function PilotPageEditor() {
  return (
    <GenericPageEditor
      pageId="pilot"
      pageName="Pilot Program"
      pageUrl="/pilot"
      sections={[
        {
          id: "hero_title",
          label: "Page Title",
          type: "text",
          placeholder: "Validate Percepta in Your Facility",
        },
        {
          id: "hero_subtitle",
          label: "Subtitle",
          type: "textarea",
          placeholder: "Structured 6–12 week pilot program to prove effectiveness...",
        },
        {
          id: "pilot_duration",
          label: "Pilot Duration",
          type: "text",
          placeholder: "6–12 Week Duration",
        },
        {
          id: "pilot_includes_title",
          label: "What's Included Section Title",
          type: "text",
          placeholder: "What's Included in the Pilot",
        },
        {
          id: "pilot_includes_subtitle",
          label: "What's Included Subtitle",
          type: "text",
          placeholder: "Comprehensive setup, calibration, and evaluation",
        },
        {
          id: "kpis_title",
          label: "KPIs Section Title",
          type: "text",
          placeholder: "Key Performance Indicators",
        },
        {
          id: "kpis_subtitle",
          label: "KPIs Subtitle",
          type: "text",
          placeholder: "Metrics we'll track to measure pilot success",
        },
        {
          id: "form_title",
          label: "Request Form Section Title",
          type: "text",
          placeholder: "Request a Pilot Program",
        },
      ]}
    />
  );
}
