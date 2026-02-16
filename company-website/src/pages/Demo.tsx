import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const API_BASE = "https://percepta.sbs/api";
const ANALYSIS_API_BASE = "";

export default function Demo() {
  const [iframeError, setIframeError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const startRef = useRef<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    startRef.current = Date.now();
    const timeout = setTimeout(() => {
      if (!loaded) setIframeError(true);
    }, 12000);
    const handler = (ev: MessageEvent) => {
      const data = ev.data;
      if (data && typeof data === "object" && data.type) {
        fetch(`${API_BASE}/analyze`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "demo_message", payload: data }),
        }).catch(() => {});
      }
    };
    window.addEventListener("message", handler);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("message", handler);
      const start = startRef.current;
        if (start) {
          const duration = Date.now() - start;
          fetch(`${API_BASE}/analyze`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "demo_session_end", duration_ms: duration }),
        }).catch(() => {});
      }
    };
  }, [loaded]);

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navigation />

      <main className="flex-1 pt-16 relative overflow-x-hidden">
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
        {!loaded && !iframeError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-4 border-muted border-t-primary animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Initializing demo...</p>
            </div>
          </div>
        )}
        <iframe
          key="demo-iframe"
          src={
            ANALYSIS_API_BASE
              ? `/percepta/index.html?api_base=${encodeURIComponent(ANALYSIS_API_BASE)}`
              : "/percepta/index.html"
          }
          className="w-full h-[calc(100dvh-4rem)] border-0"
          title="Percepta AI Live Demo"
          allow="camera; microphone"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
          loading="eager"
          ref={iframeRef}
          onLoad={() => {
            setLoaded(true);
            fetch(`${API_BASE}/analyze`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ event: "demo_start" }),
            }).catch(() => {});
          }}
          onError={() => setIframeError(true)}
          style={{ border: 'none' }}
        />
        {loaded && !iframeError && (
          <div className="absolute top-4 left-4 z-30">
            <span className="inline-block px-3 py-1 rounded-full text-xs bg-secondary text-secondary-foreground border border-border">
              System Active
            </span>
          </div>
        )}
        <section className="bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Demo Context</h2>
            <p className="text-sm text-muted-foreground mb-2">
              This live demo showcases detection and reasoning working together with a strict separation:
            </p>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>YOLO: Real-time detection of objects and proximity</li>
              <li>Gemini: Reasoning layer that interprets risk and suggests actions</li>
              <li>Production: Runs with edge-ready options and privacy-by-design safeguards</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
