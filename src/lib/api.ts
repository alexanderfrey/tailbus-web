import { getAuth, refreshAccessToken, clearAuth } from "./auth";

const COORD_URL =
  process.env.NEXT_PUBLIC_COORD_URL || "https://coord.tailbus.co";

async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const auth = getAuth();
  if (!auth) throw new Error("Not authenticated");

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${auth.accessToken}`);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let resp = await fetch(`${COORD_URL}${path}`, { ...options, headers });

  // Auto-retry on 401 with token refresh
  if (resp.status === 401) {
    const newAuth = await refreshAccessToken();
    if (!newAuth) {
      clearAuth();
      throw new Error("Session expired");
    }
    headers.set("Authorization", `Bearer ${newAuth.accessToken}`);
    resp = await fetch(`${COORD_URL}${path}`, { ...options, headers });
  }

  return resp;
}

export interface Team {
  team_id: string;
  name: string;
  role: string;
}

export interface Member {
  email: string;
  role: string;
}

export interface Node {
  node_id: string;
  advertise_addr: string;
  handles: string[] | null;
  last_heartbeat: number;
  is_relay: boolean;
}

export async function getMe(): Promise<{ email: string }> {
  const resp = await apiFetch("/api/v1/me");
  return resp.json();
}

export async function listTeams(): Promise<Team[]> {
  const resp = await apiFetch("/api/v1/teams");
  const data = await resp.json();
  return data.teams || [];
}

export async function createTeam(name: string): Promise<Team> {
  const resp = await apiFetch("/api/v1/teams", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.error || "Failed to create team");
  }
  return resp.json();
}

export async function deleteTeam(teamId: string): Promise<void> {
  const resp = await apiFetch(`/api/v1/teams/${teamId}`, {
    method: "DELETE",
  });
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.error || "Failed to delete team");
  }
}

export async function getTeamMembers(teamId: string): Promise<Member[]> {
  const resp = await apiFetch(`/api/v1/teams/${teamId}/members`);
  const data = await resp.json();
  return data.members || [];
}

export async function removeTeamMember(
  teamId: string,
  email: string
): Promise<void> {
  const resp = await apiFetch(
    `/api/v1/teams/${teamId}/members/${encodeURIComponent(email)}`,
    { method: "DELETE" }
  );
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.error || "Failed to remove member");
  }
}

export async function updateMemberRole(
  teamId: string,
  email: string,
  role: string
): Promise<void> {
  const resp = await apiFetch(
    `/api/v1/teams/${teamId}/members/${encodeURIComponent(email)}/role`,
    {
      method: "PUT",
      body: JSON.stringify({ role }),
    }
  );
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.error || "Failed to update role");
  }
}

export async function createInvite(
  teamId: string,
  maxUses = 1,
  ttlSeconds = 604800
): Promise<{ code: string; expires_at: number }> {
  const resp = await apiFetch(`/api/v1/teams/${teamId}/invites`, {
    method: "POST",
    body: JSON.stringify({ max_uses: maxUses, ttl_seconds: ttlSeconds }),
  });
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.error || "Failed to create invite");
  }
  return resp.json();
}

export async function acceptInvite(
  code: string
): Promise<{ team_id: string; team_name: string }> {
  const resp = await apiFetch("/api/v1/invites/accept", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.error || "Failed to accept invite");
  }
  return resp.json();
}

export async function getTeamNodes(teamId: string): Promise<Node[]> {
  const resp = await apiFetch(`/api/v1/teams/${teamId}/nodes`);
  const data = await resp.json();
  return data.nodes || [];
}
