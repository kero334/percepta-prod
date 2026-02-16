import { Route, Routes, Navigate } from "react-router";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import HomePageEditor from "./editors/HomePageEditor";
import TeamPageEditor from "./editors/TeamPageEditor";
import MaterialsPageEditor from "./editors/MaterialsPageEditor";
import WhatWeDoPageEditor from "./editors/WhatWeDoPageEditor";
import UseCasePageEditor from "./editors/UseCasePageEditor";
import HowItWorksPageEditor from "./editors/HowItWorksPageEditor";
import PilotPageEditor from "./editors/PilotPageEditor";
import ContactPageEditor from "./editors/ContactPageEditor";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

export default function AdminRouter() {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/home"
        element={
          <ProtectedRoute>
            <HomePageEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/team"
        element={
          <ProtectedRoute>
            <TeamPageEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/what-we-do"
        element={
          <ProtectedRoute>
            <WhatWeDoPageEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/use-case"
        element={
          <ProtectedRoute>
            <UseCasePageEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/how-it-works"
        element={
          <ProtectedRoute>
            <HowItWorksPageEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/pilot"
        element={
          <ProtectedRoute>
            <PilotPageEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/materials"
        element={
          <ProtectedRoute>
            <MaterialsPageEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/contact"
        element={
          <ProtectedRoute>
            <ContactPageEditor />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
