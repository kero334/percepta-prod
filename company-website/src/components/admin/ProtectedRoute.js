import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from "react-router";
export default function ProtectedRoute({ children }) {
    const isAuthenticated = sessionStorage.getItem("adminAuthenticated") === "true";
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/admin", replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
