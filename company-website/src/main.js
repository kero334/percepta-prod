import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "animate-pulse text-muted-foreground", children: "Loading..." }) }));
}
const convexUrl = import.meta.env.VITE_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;
function RouteSyncer() {
    const location = useLocation();
    useEffect(() => {
        window.parent.postMessage({ type: "iframe-route-change", path: location.pathname }, "*");
    }, [location.pathname]);
    useEffect(() => {
        function handleMessage(event) {
            if (event.data?.type === "navigate") {
                if (event.data.direction === "back")
                    window.history.back();
                if (event.data.direction === "forward")
                    window.history.forward();
            }
        }
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);
    return null;
}
createRoot(document.getElementById("root")).render(_jsxs(StrictMode, { children: [_jsx(VlyToolbar, {}), _jsx(InstrumentationProvider, { children: convex ? (_jsxs(ConvexAuthProvider, { client: convex, children: [_jsxs(BrowserRouter, { children: [_jsx(RouteSyncer, {}), _jsx(Suspense, { fallback: _jsx(RouteLoading, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/what-we-do", element: _jsx(WhatWeDo, {}) }), _jsx(Route, { path: "/use-case", element: _jsx(UseCase, {}) }), _jsx(Route, { path: "/how-it-works", element: _jsx(HowItWorks, {}) }), _jsx(Route, { path: "/pilot", element: _jsx(Pilot, {}) }), _jsx(Route, { path: "/team", element: _jsx(Team, {}) }), _jsx(Route, { path: "/materials", element: _jsx(Materials, {}) }), _jsx(Route, { path: "/demo", element: _jsx(Demo, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }), _jsx(Route, { path: "/admin", element: _jsx(AdminLogin, {}) }), _jsx(Route, { path: "/admin/team", element: _jsx(AdminTeam, {}) }), _jsx(Route, { path: "/admin/manage/team-members", element: _jsx(Navigate, { to: "/admin/team", replace: true }) }), _jsx(Route, { path: "/auth", element: _jsx(AuthPage, { redirectAfterAuth: "/" }) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) })] }), _jsx(Toaster, {})] })) : (_jsxs(_Fragment, { children: [_jsxs(BrowserRouter, { children: [_jsx(RouteSyncer, {}), _jsx(Suspense, { fallback: _jsx(RouteLoading, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/what-we-do", element: _jsx(WhatWeDo, {}) }), _jsx(Route, { path: "/use-case", element: _jsx(UseCase, {}) }), _jsx(Route, { path: "/how-it-works", element: _jsx(HowItWorks, {}) }), _jsx(Route, { path: "/pilot", element: _jsx(Pilot, {}) }), _jsx(Route, { path: "/team", element: _jsx(Team, {}) }), _jsx(Route, { path: "/materials", element: _jsx(Materials, {}) }), _jsx(Route, { path: "/demo", element: _jsx(Demo, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }), _jsx(Route, { path: "/admin", element: _jsx(AdminLogin, {}) }), _jsx(Route, { path: "/admin/team", element: _jsx(AdminTeam, {}) }), _jsx(Route, { path: "/admin/manage/team-members", element: _jsx(Navigate, { to: "/admin/team", replace: true }) }), _jsx(Route, { path: "/auth", element: _jsx(AuthPage, { redirectAfterAuth: "/" }) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) })] }), _jsx(Toaster, {})] })) })] }));
