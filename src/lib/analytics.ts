declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function gtag(...args: unknown[]) {
  if (typeof window === "undefined" || !window.gtag || !GA_ID) return;
  window.gtag(...args);
}

export function trackPageView(url: string) {
  gtag("config", GA_ID, { page_path: url });
}

export function trackEvent(action: string, params?: Record<string, unknown>) {
  gtag("event", action, params);
}

export function trackLogin() {
  trackEvent("login", { method: "google" });
}

export function trackTeamCreated(teamId: string) {
  trackEvent("team_created", { team_id: teamId });
}

export function trackTeamDeleted(teamId: string) {
  trackEvent("team_deleted", { team_id: teamId });
}

export function trackInviteGenerated(teamId: string) {
  trackEvent("invite_generated", { team_id: teamId });
}

export function trackInviteAccepted(teamId: string) {
  trackEvent("invite_accepted", { team_id: teamId });
}

export function trackMemberRemoved(teamId: string) {
  trackEvent("member_removed", { team_id: teamId });
}

export function trackMemberRoleChanged(teamId: string, newRole: string) {
  trackEvent("member_role_changed", { team_id: teamId, new_role: newRole });
}
