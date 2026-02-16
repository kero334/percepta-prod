import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot, } from "@/components/ui/input-otp";
import { useAuth } from "@/hooks/use-auth";
import { ArrowRight, Loader2, Mail, UserX } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router";
function Auth({ redirectAfterAuth } = {}) {
    const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState("signIn");
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            const redirect = redirectAfterAuth || "/";
            navigate(redirect);
        }
    }, [authLoading, isAuthenticated, navigate, redirectAfterAuth]);
    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const formData = new FormData(event.currentTarget);
            await signIn("email-otp", formData);
            setStep({ email: formData.get("email") });
            setIsLoading(false);
        }
        catch (error) {
            console.error("Email sign-in error:", error);
            setError(error instanceof Error
                ? error.message
                : "Failed to send verification code. Please try again.");
            setIsLoading(false);
        }
    };
    const handleOtpSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const formData = new FormData(event.currentTarget);
            await signIn("email-otp", formData);
            console.log("signed in");
            const redirect = redirectAfterAuth || "/";
            navigate(redirect);
        }
        catch (error) {
            console.error("OTP verification error:", error);
            setError("The verification code you entered is incorrect.");
            setIsLoading(false);
            setOtp("");
        }
    };
    const handleGuestLogin = async () => {
        setIsLoading(true);
        setError(null);
        try {
            console.log("Attempting anonymous sign in...");
            await signIn("anonymous");
            console.log("Anonymous sign in successful");
            const redirect = redirectAfterAuth || "/";
            navigate(redirect);
        }
        catch (error) {
            console.error("Guest login error:", error);
            console.error("Error details:", JSON.stringify(error, null, 2));
            setError(`Failed to sign in as guest: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex flex-col", children: _jsx("div", { className: "flex-1 flex items-center justify-center", children: _jsx("div", { className: "flex items-center justify-center h-full flex-col", children: _jsxs(Card, { className: "min-w-[350px] pb-0 border shadow-md", children: [step === "signIn" ? (_jsxs(_Fragment, { children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx("div", { className: "flex justify-center", children: _jsx("img", { src: "./logo.svg", alt: "Lock Icon", width: 64, height: 64, className: "rounded-lg mb-4 mt-4 cursor-pointer", onClick: () => navigate("/") }) }), _jsx(CardTitle, { className: "text-xl", children: "Get Started" }), _jsx(CardDescription, { children: "Enter your email to log in or sign up" })] }), _jsx("form", { onSubmit: handleEmailSubmit, children: _jsxs(CardContent, { children: [_jsxs("div", { className: "relative flex items-center gap-2", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Mail, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), _jsx(Input, { name: "email", placeholder: "name@example.com", type: "email", className: "pl-9", disabled: isLoading, required: true })] }), _jsx(Button, { type: "submit", variant: "outline", size: "icon", disabled: isLoading, children: isLoading ? (_jsx(Loader2, { className: "h-4 w-4 animate-spin" })) : (_jsx(ArrowRight, { className: "h-4 w-4" })) })] }), error && (_jsx("p", { className: "mt-2 text-sm text-red-500", children: error })), _jsxs("div", { className: "mt-4", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("span", { className: "w-full border-t" }) }), _jsx("div", { className: "relative flex justify-center text-xs uppercase", children: _jsx("span", { className: "bg-background px-2 text-muted-foreground", children: "Or" }) })] }), _jsxs(Button, { type: "button", variant: "outline", className: "w-full mt-4", onClick: handleGuestLogin, disabled: isLoading, children: [_jsx(UserX, { className: "mr-2 h-4 w-4" }), "Continue as Guest"] })] })] }) })] })) : (_jsxs(_Fragment, { children: [_jsxs(CardHeader, { className: "text-center mt-4", children: [_jsx(CardTitle, { children: "Check your email" }), _jsxs(CardDescription, { children: ["We've sent a code to ", step.email] })] }), _jsxs("form", { onSubmit: handleOtpSubmit, children: [_jsxs(CardContent, { className: "pb-4", children: [_jsx("input", { type: "hidden", name: "email", value: step.email }), _jsx("input", { type: "hidden", name: "code", value: otp }), _jsx("div", { className: "flex justify-center", children: _jsx(InputOTP, { value: otp, onChange: setOtp, maxLength: 6, disabled: isLoading, onKeyDown: (e) => {
                                                            if (e.key === "Enter" && otp.length === 6 && !isLoading) {
                                                                // Find the closest form and submit it
                                                                const form = e.target.closest("form");
                                                                if (form) {
                                                                    form.requestSubmit();
                                                                }
                                                            }
                                                        }, children: _jsx(InputOTPGroup, { children: Array.from({ length: 6 }).map((_, index) => (_jsx(InputOTPSlot, { index: index }, index))) }) }) }), error && (_jsx("p", { className: "mt-2 text-sm text-red-500 text-center", children: error })), _jsxs("p", { className: "text-sm text-muted-foreground text-center mt-4", children: ["Didn't receive a code?", " ", _jsx(Button, { variant: "link", className: "p-0 h-auto", onClick: () => setStep("signIn"), children: "Try again" })] })] }), _jsxs(CardFooter, { className: "flex-col gap-2", children: [_jsx(Button, { type: "submit", className: "w-full", disabled: isLoading || otp.length !== 6, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Verifying..."] })) : (_jsxs(_Fragment, { children: ["Verify code", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })) }), _jsx(Button, { type: "button", variant: "ghost", onClick: () => setStep("signIn"), disabled: isLoading, className: "w-full", children: "Use different email" })] })] })] })), _jsxs("div", { className: "py-4 px-6 text-xs text-center text-muted-foreground bg-muted border-t rounded-b-lg", children: ["Secured by", " ", _jsx("a", { href: "https://vly.ai", target: "_blank", rel: "noopener noreferrer", className: "underline hover:text-primary transition-colors", children: "vly.ai" })] })] }) }) }) }));
}
export default function AuthPage(props) {
    return (_jsx(Suspense, { children: _jsx(Auth, { ...props }) }));
}
