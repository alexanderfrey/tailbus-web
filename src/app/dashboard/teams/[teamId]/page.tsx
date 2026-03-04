"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { LoginGate } from "@/components/LoginGate";
import { MembersTable } from "@/components/MembersTable";
import { NodesTable } from "@/components/NodesTable";
import { InviteDialog } from "@/components/InviteDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import {
  getTeamMembers,
  getTeamNodes,
  deleteTeam,
  type Member,
  type Node,
} from "@/lib/api";

function TeamDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const teamId = params.teamId as string;

  const [members, setMembers] = useState<Member[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [error, setError] = useState("");

  const currentRole =
    members.find((m) => m.email === user?.email)?.role || "";
  const isOwner = currentRole === "owner";

  const fetchData = async () => {
    try {
      const [m, n] = await Promise.all([
        getTeamMembers(teamId),
        getTeamNodes(teamId),
      ]);
      setMembers(m);
      setNodes(n);
    } catch {
      setError("Failed to load team data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [teamId]);

  const handleDelete = async () => {
    try {
      await deleteTeam(teamId);
      router.push("/dashboard");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to delete team");
      setDeleteOpen(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-400">Loading team...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm text-gray-400 hover:text-white transition-colors mb-2 flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back to dashboard
          </button>
          <h1 className="text-3xl font-bold text-white">Team</h1>
          <p className="mt-1 text-sm text-gray-400 font-mono">{teamId}</p>
        </div>
        {isOwner && (
          <button
            onClick={() => setInviteOpen(true)}
            className="px-4 py-2 text-sm font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-lg hover:bg-blue-400/20 transition-colors"
          >
            Generate invite
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
          {error}
        </div>
      )}

      {/* Members section */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4">Members</h2>
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl overflow-hidden">
          <MembersTable
            teamId={teamId}
            members={members}
            currentEmail={user?.email || ""}
            isOwner={isOwner}
            onUpdate={fetchData}
          />
        </div>
      </section>

      {/* Nodes section */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4">Nodes</h2>
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl overflow-hidden">
          <NodesTable nodes={nodes} />
        </div>
      </section>

      {/* Danger zone */}
      {isOwner && (
        <section>
          <h2 className="text-lg font-semibold text-red-400 mb-4">
            Danger zone
          </h2>
          <div className="p-6 bg-gray-900/50 border border-red-400/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white">
                  Delete this team
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Permanently delete this team and remove all members. This
                  cannot be undone.
                </p>
              </div>
              <button
                onClick={() => setDeleteOpen(true)}
                className="px-4 py-2 text-sm font-medium text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg hover:bg-red-400/20 transition-colors"
              >
                Delete team
              </button>
            </div>
          </div>
        </section>
      )}

      <InviteDialog
        open={inviteOpen}
        teamId={teamId}
        onClose={() => setInviteOpen(false)}
      />
      <ConfirmDialog
        open={deleteOpen}
        title="Delete team"
        message="This will permanently delete the team and remove all members. Connected nodes will be unscoped. This cannot be undone."
        confirmLabel="Delete team"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}

export default function TeamDetailPage() {
  return (
    <LoginGate>
      <TeamDetailContent />
    </LoginGate>
  );
}
