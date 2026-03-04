const ACCESS_TOKEN_KEY = "tailbus_access_token";
const REFRESH_TOKEN_KEY = "tailbus_refresh_token";
const EMAIL_KEY = "tailbus_email";

export interface AuthState {
  accessToken: string;
  refreshToken: string;
  email: string;
}

export function getAuth(): AuthState | null {
  if (typeof window === "undefined") return null;
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  const email = localStorage.getItem(EMAIL_KEY);
  if (!accessToken || !refreshToken || !email) return null;
  return { accessToken, refreshToken, email };
}

export function setAuth(state: AuthState) {
  localStorage.setItem(ACCESS_TOKEN_KEY, state.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, state.refreshToken);
  localStorage.setItem(EMAIL_KEY, state.email);
}

export function clearAuth() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
}

export function getLoginUrl(): string {
  const coordURL =
    process.env.NEXT_PUBLIC_COORD_URL || "https://coord.tailbus.co";
  return `${coordURL}/oauth/login`;
}

export function parseAuthFromFragment(): AuthState | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.substring(1);
  if (!hash) return null;

  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");
  const email = params.get("email");

  if (!accessToken || !refreshToken || !email) return null;
  return { accessToken, refreshToken, email };
}

export async function refreshAccessToken(): Promise<AuthState | null> {
  const auth = getAuth();
  if (!auth) return null;

  const coordURL =
    process.env.NEXT_PUBLIC_COORD_URL || "https://coord.tailbus.co";
  const resp = await fetch(`${coordURL}/oauth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: auth.refreshToken }),
  });

  if (!resp.ok) return null;

  const data = await resp.json();
  const newAuth: AuthState = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    email: data.email || auth.email,
  };
  setAuth(newAuth);
  return newAuth;
}
