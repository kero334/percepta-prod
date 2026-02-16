import { Link } from "react-router";
import { ArrowLeft, Eye, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface PageEditorLayoutProps {
  pageName: string;
  pageUrl: string;
  onSave: () => void;
  isSaving?: boolean;
  children: React.ReactNode;
}

export default function PageEditorLayout({
  pageName,
  pageUrl,
  onSave,
  isSaving = false,
  children,
}: PageEditorLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft size={16} className="mr-2" />
                  All Pages
                </Button>
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <h1 className="text-xl font-semibold text-foreground">
                Editing: {pageName}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <a href={pageUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <Eye size={16} className="mr-2" />
                  Preview Page
                </Button>
              </a>
              <Button onClick={onSave} disabled={isSaving} size="sm">
                <Save size={16} className="mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
