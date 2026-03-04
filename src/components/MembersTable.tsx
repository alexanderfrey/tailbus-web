"use client";

import { useState } from "react";
import type { Member } from "@/lib/api";
import { removeTeamMember, updateMemberRole } from "@/lib/api";
import { ConfirmDialog } from "./ConfirmDialog";

interface MembersTableProps {
  teamId: string;
  members: Member[];
  currentEmail: string;
  isOwner: boolean;
  onUpdate: () => void;
}

export function MembersTable({
  teamId,
  members,
  currentEmail,
  isOwner,
  onUpdate,
}: MembersTableProps) {
  const [removing, setRemoving] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleRemove = async () => {
    if (!removing) return;
    try {
      await removeTeamMember(teamId, removing);
      setRemoving(null);
      onUpdate();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to remove member");
    }
  };

  const handleToggleRole = async (email: string, currentRole: string) => {
    setError("");
    const newRole = currentRole === "owner" ? "member" : "owner";
    try {
      await updateMemberRole(teamId, email, newRole);
      onUpdate();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to update role");
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
          {error}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800/50">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">
                Email
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">
                Role
              </th>
              {isOwner && (
                <th className="text-right py-3 px-4 text-gray-400 font-medium">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr
                key={m.email}
                className="border-b border-gray-800/30 hover:bg-gray-800/20"
              >
                <td className="py-3 px-4 text-white font-mono text-xs">
                  {m.email}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      m.role === "owner"
                        ? "text-amber-400 bg-amber-400/10 border border-amber-400/20"
                        : "text-blue-400 bg-blue-400/10 border border-blue-400/20"
                    }`}
                  >
                    {m.role}
                  </span>
                </td>
                {isOwner && (
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleRole(m.email, m.role)}
                        className="text-xs text-gray-400 hover:text-white transition-colors"
                      >
                        {m.role === "owner" ? "Demote" : "Promote"}
                      </button>
                      {m.email !== currentEmail && (
                        <button
                          onClick={() => setRemoving(m.email)}
                          className="text-xs text-red-400 hover:text-red-300 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        open={!!removing}
        title="Remove member"
        message={`Remove ${removing} from this team? They will lose access to all team resources.`}
        confirmLabel="Remove"
        onConfirm={handleRemove}
        onCancel={() => setRemoving(null)}
      />
    </div>
  );
}
