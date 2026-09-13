import {
    BriefcaseBusiness,
    Crown,
    LockKeyhole,
    Sparkles,
    UserRoundCheck,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginWithPin } from "../api/auth";
import { saveSession } from "../auth/session";
import { PinPad } from "../components/PinPad";
import { RoleCard } from "../components/RoleCard";
import type { StaffRole } from "../types/auth";



// type LoginPageProps = {
//   onAuthenticated: () => void;
// };

const roles = [
  {
    role: "owner" as const,
    title: "Owner",
    description: "Full access to all features",
    icon: Crown,
  },
  {
    role: "front_desk" as const,
    title: "Front Desk",
    description: "Manage appointments and checkouts",
    icon: BriefcaseBusiness,
  },
  {
    role: "technician" as const,
    title: "Technician",
    description: "View schedule and client services",
    icon: Sparkles,
  },
];

export function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<StaffRole>("owner");
  const [pin, setPin] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  function selectRole(role: StaffRole) {
    setSelectedRole(role);
    setPin("");
    setErrorMessage(null);
  }

  function addDigit(digit: string) {
    setErrorMessage(null);
    setPin((currentPin) =>
      currentPin.length < 4 ? `${currentPin}${digit}` : currentPin,
    );
  }

  async function handleSignIn() {
    if (pin.length !== 4 || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
        const session = await loginWithPin(selectedRole, pin);

        saveSession(session);

        navigate("/dashboard", { replace: true });
    } catch {
      setPin("");
      navigate("/ErrorDashboard");
      setErrorMessage("Incorrect role or PIN. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-card" aria-labelledby="login-title">
        <div className="brand-lock" aria-hidden="true">
          <LockKeyhole size={19} />
        </div>

        <header className="brand-header">
          <p className="brand-name">
            <span>Nail</span>Flow
          </p>
          <p className="brand-tagline">Salon POS &amp; Operations</p>
        </header>

        <div className="welcome-copy">
          <h1 id="login-title">Welcome back!</h1>
          <p>Select your role and enter your PIN to sign in.</p>
        </div>

        <section aria-label="Select your role">
          <p className="section-label">Select your role</p>

          <div className="role-grid">
            {roles.map((role) => (
              <RoleCard
                key={role.role}
                role={role.role}
                title={role.title}
                description={role.description}
                icon={role.icon}
                selected={selectedRole === role.role}
                onSelect={selectRole}
              />
            ))}
          </div>
        </section>

        <section className="pin-section" aria-label="Enter your PIN">
          <p className="section-label">Enter your PIN</p>

          <div
            className="pin-dots"
            aria-label={`${pin.length} of 4 PIN digits entered`}
          >
            {[0, 1, 2, 3].map((index) => (
              <span
                key={index}
                className={`pin-dot ${
                  index < pin.length ? "pin-dot--filled" : ""
                }`}
              />
            ))}
          </div>

          <PinPad
            pinLength={pin.length}
            disabled={isSubmitting}
            onDigit={addDigit}
            onBackspace={() =>
              setPin((currentPin) => currentPin.slice(0, -1))
            }
            onClear={() => setPin("")}
          />
        </section>

        {errorMessage && (
          <p className="form-error" role="alert">
            {errorMessage}
          </p>
        )}

        <button
          type="button"
          className="sign-in-button"
          disabled={pin.length !== 4 || isSubmitting}
          onClick={() => void handleSignIn()}
        >
          <LockKeyhole size={18} aria-hidden="true" />
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </section>

      <p className="secure-note">
        <UserRoundCheck size={17} aria-hidden="true" />
        Secure login · Your data is protected
      </p>
    </main>
  );
}