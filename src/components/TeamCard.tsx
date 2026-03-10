"use client";

import Link from "next/link";
import type { Team } from "@/lib/api";

interface TeamCardProps {
  team: Team;
  memberCount?: number;
  nodeCount?: number;
}

export function TeamCard({ team, memberCount, nodeCount }: TeamCardProps) {
  return (
    <Link
      href={`/dashboard/teams/${team.team_id}`}
      className="block p-6 bg-gray-900/50 border border-gray-800/50 rounded-xl hover:border-gray-700/50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{team.name}</h3>
        <span
          className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
            team.role === "owner"
              ? "text-amber-400 bg-amber-400/10 border border-amber-400/20"
              : "text-blue-400 bg-blue-400/10 border border-blue-400/20"
          }`}
        >
          {team.role}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-400 font-mono">{team.team_id}</p>
      {(memberCount !== undefined || nodeCount !== undefined) && (
        <p className="mt-1 text-xs text-gray-500">
          {memberCount !== undefined && `${memberCount} member${memberCount !== 1 ? "s" : ""}`}
          {memberCount !== undefined && nodeCount !== undefined && ", "}
          {nodeCount !== undefined && `${nodeCount} node${nodeCount !== 1 ? "s" : ""}`}
        </p>
      )}
    </Link>
  );
}
