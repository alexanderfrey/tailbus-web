"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useDashboardData } from "@/components/DashboardDataProvider";
import { TeamCard } from "@/components/TeamCard";
import { StatCard } from "@/components/StatCard";
import { parseAuthFromFragment, setAuth } from "@/lib/auth";
import { createTeam } from "@/lib/api";
import { trackLogin, trackTeamCreated } from "@/lib/analytics";

export default function DashboardPage() {
  const { refresh: refreshAuth } = useAuth();
  const { stats, teams, teamDetails, loading, refresh } = useDashboardData();
  const [newTeamName, setNewTeamName] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  // Parse tokens from URL fragment on OAuth callback
  useEffect(() => {
    const auth = parseAuthFromFragment();
    if (auth) {
      setAuth(auth);
      window.history.replaceState(null, "", window.location.pathname);
      refreshAuth();
      trackLogin();
    }
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;
    setCreating(true);
    setError("");
    try {
      const team = await createTeam(newTeamName.trim());
      setNewTeamName("");
      trackTeamCreated(team.team_id);
      await refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to create team");
    } finally {
      setCreating(false);
    }
  };

  const getMemberCount = (teamId: string) =>
    teamDetails.find((d) => d.team.team_id === teamId)?.members.length;
  const getNodeCount = (teamId: string) =>
    teamDetails.find((d) => d.team.team_id === teamId)?.nodes.length;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Overview</h1>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          }
          label="Teams"
          value={stats.totalTeams}
          subtitle={`${stats.teamsOwned} owned, ${stats.teamsMember} member`}
        />
        <StatCard
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          }
          label="Members"
          value={stats.totalMembers}
        />
        <StatCard
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
            </svg>
          }
          label="Active Nodes"
          value={stats.activeNodes}
          subtitle={`${stats.totalNodes} total`}
        />
        <StatCard
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          }
          label="Total Nodes"
          value={stats.totalNodes}
        />
      </div>

      {error && (
        <div className="mb-6 p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
          {error}
        </div>
      )}

      {/* Create team */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Create team</h2>
        <form onSubmit={handleCreate} className="flex gap-3">
          <input
            type="text"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            placeholder="Team name"
            className="flex-1 max-w-sm px-4 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400/50"
          />
          <button
            type="submit"
            disabled={creating || !newTeamName.trim()}
            className="px-4 py-2 text-sm font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-lg hover:bg-blue-400/20 transition-colors disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create"}
          </button>
        </form>
      </div>

      {/* Teams list */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Your teams</h2>
        {loading ? (
          <p className="text-sm text-gray-400">Loading teams...</p>
        ) : teams.length === 0 ? (
          <p className="text-sm text-gray-500">
            No teams yet. Create one above to get started.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {teams.map((team) => (
              <TeamCard
                key={team.team_id}
                team={team}
                memberCount={getMemberCount(team.team_id)}
                nodeCount={getNodeCount(team.team_id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
