import GenericPageEditor from "./GenericPageEditor";

export default function ContactPageEditor() {
  return (
    <GenericPageEditor
      pageId="contact"
      pageName="Contact"
      pageUrl="/contact"
      sections={[
        {
          id: "hero_title",
          label: "Page Title",
          type: "text",
          placeholder: "Get in Touch",
        },
        {
          id: "hero_subtitle",
          label: "Subtitle",
          type: "textarea",
          placeholder: "We're currently collaborating with pilot partners...",
        },
        {
          id: "reasons_title",
          label: "Contact Reasons Section Title",
          type: "text",
          placeholder: "Why Reach Out?",
        },
        {
          id: "reasons_subtitle",
          label: "Contact Reasons Subtitle",
          type: "text",
          placeholder: "We welcome conversations with these audiences",
        },
        {
          id: "form_title",
          label: "Contact Form Section Title",
          type: "text",
          placeholder: "Send Us a Message",
        },
        {
          id: "form_subtitle",
          label: "Contact Form Subtitle",
          type: "textarea",
          placeholder: "Fill out the form below and we'll get back to you...",
        },
        {
          id: "email_address",
          label: "Contact Email",
          type: "text",
          placeholder: "hello@percepta.ai",
        },
      ]}
    />
  );
}
