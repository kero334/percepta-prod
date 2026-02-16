import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Demo() {
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 pt-16 relative">
        {iframeError && (
          <div className="absolute inset-0 flex items-center justify-center bg-background p-8">
            <div className="text-center">
              <p className="text-destructive mb-4">Failed to load demo</p>
              <button
                onClick={() => {
                  setIframeError(false);
                  window.location.reload();
                }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        <iframe
          key="demo-iframe"
          src="/demo.html"
          className="w-full h-[calc(100vh-4rem)] border-0"
          title="Twin Gemini Core Demo"
          allow="camera; microphone"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
          loading="eager"
          onError={() => setIframeError(true)}
          style={{ border: 'none' }}
        />
      </main>

      <Footer />
    </div>
  );
}
