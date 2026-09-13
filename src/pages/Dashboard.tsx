import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { clearSession, getSession } from "../auth/session";

export function Dashboard() {
  const navigate = useNavigate();
  const session = getSession();

  function signOut() {
    clearSession();
    navigate("/", { replace: true });
  }

  return (
    <main className="dashboard-shell">
      <section className="dashboard-card">
        <p className="brand-name">
          <span>Nail</span>Flow
        </p>

        <h1>Welcome, {session?.user.display_name ?? "Team Member"}</h1>

        <p>
          Signed in as{" "}
          {session?.user.role.replace("_", " ") ?? "staff member"}.
        </p>

        <p className="dashboard-note">
          The dashboard is next. We will add appointments, clients,
          checkout, services, reports, payroll, and commissions here.
        </p>

        <button
          className="sign-in-button dashboard-signout"
          type="button"
          onClick={signOut}
        >
          <LogOut size={18} aria-hidden="true" />
          Sign out
        </button>
      </section>
    </main>
  );
}