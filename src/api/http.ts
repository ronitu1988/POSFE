// src/api/http.ts
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export async function apiFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}${path}`,
    {
      ...options,
      headers,
      credentials: "include",
    },
  );

  if (response.status !== 401) return response;

  const refreshResponse = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  if (!refreshResponse.ok) {
    setAccessToken(null);
    throw new Error("Your session has expired. Please sign in again.");
  }

  const { access_token } = await refreshResponse.json() as {
    access_token: string;
  };

  setAccessToken(access_token);
  headers.set("Authorization", `Bearer ${access_token}`);

  return fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });
}