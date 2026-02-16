import { Link } from "react-router";
import ScrollToTop from "@/components/ScrollToTop";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleDownloadCode = async () => {
    try {
      toast.loading("Preparing website code download...");

      // Create a link to download the repository as a zip
      const repoUrl = "https://github.com/your-username/percepta/archive/refs/heads/main.zip";

      // Alternative: Download from the current site
      const link = document.createElement('a');
      link.href = window.location.origin + '/website-code.zip';
      link.download = 'percepta-website-code.zip';

      // For now, we'll show a message since we need to set up the actual zip file
      toast.dismiss();
      toast.info("Download functionality coming soon! Please contact us for the source code.");

      // In production, you would:
      // 1. Have a pre-built zip file in the public folder
      // 2. Or generate it dynamically via API
      // link.click();

    } catch (error) {
      toast.dismiss();
      toast.error("Failed to download code. Please try again.");
      console.error("Download error:", error);
    }
  };

  return (
    <>
      <ScrollToTop />
      <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/percepta-logo.png"
                alt="Percepta"
                className="h-10 w-auto"
              />
              <span className="text-xl font-semibold text-foreground">
                Percepta
              </span>
            </div>
            <p className="text-sm text-muted-foreground italic">
              Perceive. Understand. Prevent.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/use-case"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Use Case
                </Link>
              </li>
              <li>
                <Link
                  to="/pilot"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pilot Program
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Team
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/materials"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Supporting Materials
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/what-we-do"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  What We Do
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <p className="text-sm text-muted-foreground">
              <a
                href="mailto:hello@percepta.ai"
                className="hover:text-foreground transition-colors"
              >
                hello@percepta.ai
              </a>
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Collaborating with pilot partners and research-driven programs.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Percepta. All rights reserved.
            </p>
            <Button
              onClick={handleDownloadCode}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download Website Code
            </Button>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
