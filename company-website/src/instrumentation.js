import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { ChevronDown, ExternalLink } from "lucide-react";
import React, { useEffect, useState } from "react";
async function reportErrorToVly(errorData) {
    if (!import.meta.env.VITE_VLY_APP_ID) {
        return;
    }
    try {
        await fetch(import.meta.env.VITE_VLY_MONITORING_URL, {
            method: "POST",
            body: JSON.stringify({
                ...errorData,
                url: window.location.href,
                projectSemanticIdentifier: import.meta.env.VITE_VLY_APP_ID,
            }),
        });
    }
    catch (error) {
        console.error("Failed to report error to Vly:", error);
    }
}
function ErrorDialog({ error, setError, }) {
    return (_jsx(Dialog, { defaultOpen: true, onOpenChange: () => {
            setError(null);
        }, children: _jsxs(DialogContent, { className: "bg-red-700 text-white max-w-4xl", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Runtime Error" }) }), "A runtime error occurred. Open the vly editor to automatically debug the error.", _jsx("div", { className: "mt-4", children: _jsxs(Collapsible, { children: [_jsx(CollapsibleTrigger, { children: _jsxs("div", { className: "flex items-center font-bold cursor-pointer", children: ["See error details ", _jsx(ChevronDown, {})] }) }), _jsx(CollapsibleContent, { className: "max-w-[460px]", children: _jsx("div", { className: "mt-2 p-3 bg-neutral-800 rounded text-white text-sm overflow-x-auto max-h-60 max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: _jsx("pre", { className: "whitespace-pre", children: error.stack }) }) })] }) }), _jsx(DialogFooter, { children: _jsx("a", { href: `https://vly.ai/project/${import.meta.env.VITE_VLY_APP_ID}`, target: "_blank", children: _jsxs(Button, { children: [_jsx(ExternalLink, {}), " Open editor"] }) }) })] }) }));
}
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        // logErrorToMyService(
        //   error,
        //   // Example "componentStack":
        //   //   in ComponentThatThrows (created by App)
        //   //   in ErrorBoundary (created by App)
        //   //   in div (created by App)
        //   //   in App
        //   info.componentStack,
        //   // Warning: `captureOwnerStack` is not available in production.
        //   React.captureOwnerStack(),
        // );
        reportErrorToVly({
            error: error.message,
            stackTrace: error.stack,
        });
        this.setState({
            hasError: true,
            error: {
                error: error.message,
                stack: info.componentStack ?? error.stack ?? "",
            },
        });
    }
    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (_jsx(ErrorDialog, { error: {
                    error: "An error occurred",
                    stack: "",
                }, setError: () => { } }));
        }
        return this.props.children;
    }
}
export function InstrumentationProvider({ children, }) {
    const [error, setError] = useState(null);
    useEffect(() => {
        const handleError = async (event) => {
            try {
                console.log(event);
                event.preventDefault();
                setError({
                    error: event.message,
                    stack: event.error?.stack || "",
                    filename: event.filename || "",
                    lineno: event.lineno,
                    colno: event.colno,
                });
                if (import.meta.env.VITE_VLY_APP_ID) {
                    await reportErrorToVly({
                        error: event.message,
                        stackTrace: event.error?.stack,
                        filename: event.filename,
                        lineno: event.lineno,
                        colno: event.colno,
                    });
                }
            }
            catch (error) {
                console.error("Error in handleError:", error);
            }
        };
        const handleRejection = async (event) => {
            try {
                console.error(event);
                if (import.meta.env.VITE_VLY_APP_ID) {
                    await reportErrorToVly({
                        error: event.reason.message,
                        stackTrace: event.reason.stack,
                    });
                }
                setError({
                    error: event.reason.message,
                    stack: event.reason.stack,
                });
            }
            catch (error) {
                console.error("Error in handleRejection:", error);
            }
        };
        window.addEventListener("error", handleError);
        window.addEventListener("unhandledrejection", handleRejection);
        return () => {
            window.removeEventListener("error", handleError);
            window.removeEventListener("unhandledrejection", handleRejection);
        };
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(ErrorBoundary, { children: children }), error && _jsx(ErrorDialog, { error: error, setError: setError })] }));
}
