import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "textarea" | "url";
  placeholder?: string;
  helperText?: string;
}

export default function EditableField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  helperText,
}: EditableFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {type === "textarea" ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full"
        />
      ) : (
        <Input
          type={type === "url" ? "url" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full"
        />
      )}
      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
