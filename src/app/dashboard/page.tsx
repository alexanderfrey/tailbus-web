"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { LoginGate } from "@/components/LoginGate";
import { TeamCard } from "@/components/TeamCard";
import { parseAuthFromFragment, setAuth } from "@/lib/auth";
import { listTeams, createTeam, type Team } from "@/lib/api";

function DashboardContent() {
  const { user, logout } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTeamName, setNewTeamName] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const fetchTeams = async () => {
    try {
      const t = await listTeams();
      setTeams(t);
    } catch {
      setError("Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;
    setCreating(true);
    setError("");
    try {
      await createTeam(newTeamName.trim());
      setNewTeamName("");
      await fetchTeams();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to create team");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Sign out
        </button>
      </div>

      {error && (
        <div className="mb-6 p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
          {error}
        </div>
      )}

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
              <TeamCard key={team.team_id} team={team} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { refresh } = useAuth();

  // Parse tokens from URL fragment on OAuth callback
  useEffect(() => {
    const auth = parseAuthFromFragment();
    if (auth) {
      setAuth(auth);
      // Clean fragment from URL
      window.history.replaceState(null, "", window.location.pathname);
      refresh();
    }
  }, []);

  return (
    <LoginGate>
      <DashboardContent />
    </LoginGate>
  );
}
