import type { LoginResponse } from "../types/auth";

const SESSION_KEY = "nailflow.session";

export function saveSession(session: LoginResponse): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): LoginResponse | null {
  const stored = sessionStorage.getItem(SESSION_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as LoginResponse;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}