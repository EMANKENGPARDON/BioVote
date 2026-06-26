import { Navigate, Outlet } from "react-router-dom";
import { readJson, WORKFLOW_KEYS } from "../../utils/workflowSession";

export function RequireRegistration() {
  const nationalId = localStorage.getItem(WORKFLOW_KEYS.registeredNationalId);
  return nationalId ? <Outlet /> : <Navigate to="/register-voter" replace />;
}

export function RequireVerifiedVoter() {
  const verifiedVoter = readJson(WORKFLOW_KEYS.verifiedVoter);
  return verifiedVoter ? <Outlet /> : <Navigate to="/verification" replace />;
}

export function RequireAdmin() {
  const token = localStorage.getItem(WORKFLOW_KEYS.adminToken);
  return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
