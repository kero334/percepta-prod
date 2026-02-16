import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SectionEditorProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export default function SectionEditor({
  title,
  children,
  defaultExpanded = false,
}: SectionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <Card className="border-border">
      <CardContent className="p-0">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
        >
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {isExpanded ? (
            <ChevronUp size={20} className="text-muted-foreground" />
          ) : (
            <ChevronDown size={20} className="text-muted-foreground" />
          )}
        </button>

        {isExpanded && (
          <div className="px-6 pb-6 space-y-4 border-t border-border pt-6">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
