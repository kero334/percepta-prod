import { Toaster } from "@/components/ui/sonner";
import { VlyToolbar } from "../vly-toolbar-readonly";
import { InstrumentationProvider } from "@/instrumentation";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./index.css";
import "./types/global.d.ts";

// Lazy load route components for better code splitting
const Home = lazy(() => import("./pages/Home"));
const WhatWeDo = lazy(() => import("./pages/WhatWeDo"));
const UseCase = lazy(() => import("./pages/UseCase"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Pilot = lazy(() => import("./pages/Pilot"));
const Team = lazy(() => import("./pages/Team"));
const Materials = lazy(() => import("./pages/Materials"));
const Demo = lazy(() => import("./pages/Demo"));
const Contact = lazy(() => import("./pages/Contact"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminTeam = lazy(() => import("./pages/admin/AdminTeam"));
const AuthPage = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Simple loading fallback for route transitions
function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}

const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;



function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VlyToolbar />
    <InstrumentationProvider>
      {convex ? (
        <ConvexAuthProvider client={convex}>
          <BrowserRouter>
            <RouteSyncer />
            <Suspense fallback={<RouteLoading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/what-we-do" element={<WhatWeDo />} />
                <Route path="/use-case" element={<UseCase />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/pilot" element={<Pilot />} />
                <Route path="/team" element={<Team />} />
                <Route path="/materials" element={<Materials />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/team" element={<AdminTeam />} />
                <Route path="/admin/manage/team-members" element={<Navigate to="/admin/team" replace />} />
                <Route path="/auth" element={<AuthPage redirectAfterAuth="/" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Toaster />
        </ConvexAuthProvider>
      ) : (
        <>
          <BrowserRouter>
            <RouteSyncer />
            <Suspense fallback={<RouteLoading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/what-we-do" element={<WhatWeDo />} />
                <Route path="/use-case" element={<UseCase />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/pilot" element={<Pilot />} />
                <Route path="/team" element={<Team />} />
                <Route path="/materials" element={<Materials />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/team" element={<AdminTeam />} />
                <Route path="/admin/manage/team-members" element={<Navigate to="/admin/team" replace />} />
                <Route path="/auth" element={<AuthPage redirectAfterAuth="/" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Toaster />
        </>
      )}
    </InstrumentationProvider>
  </StrictMode>,
);
