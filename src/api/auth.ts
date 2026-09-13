import type {
    ApiErrorResponse,
    LoginResponse,
    StaffRole,
} from "../types/auth";
import { ApiError, apiFetch } from "./client";

export async function loginWithPin(
  role: StaffRole,
  pin: string,
): Promise<LoginResponse> {
  const response = await apiFetch("/auth/pin-login", {
    method: "POST",
    body: JSON.stringify({
      role,
      pin,
    }),
  });

  if (!response.ok) {
    const error = (await response
      .json()
      .catch(() => null)) as ApiErrorResponse | null;

    throw new ApiError(
      error?.detail ?? "Unable to sign in. Please try again.",
      response.status,
    );
  }

  return (await response.json()) as LoginResponse;
}