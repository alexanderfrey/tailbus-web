"use client";

import type { Node } from "@/lib/api";

function timeAgo(unix: number): string {
  const seconds = Math.floor(Date.now() / 1000 - unix);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function NodesTable({ nodes }: { nodes: Node[] }) {
  if (nodes.length === 0) {
    return (
      <p className="text-sm text-gray-500 py-4">
        No nodes connected to this team yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800/50">
            <th className="text-left py-3 px-4 text-gray-400 font-medium">
              Node ID
            </th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">
              Address
            </th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">
              Handles
            </th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">
              Last Seen
            </th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((n) => (
            <tr
              key={n.node_id}
              className="border-b border-gray-800/30 hover:bg-gray-800/20"
            >
              <td className="py-3 px-4 font-mono text-xs text-white">
                <div className="flex items-center gap-2">
                  {n.is_relay && (
                    <span className="px-1.5 py-0.5 text-[10px] text-violet-400 bg-violet-400/10 border border-violet-400/20 rounded">
                      relay
                    </span>
                  )}
                  {n.node_id}
                </div>
              </td>
              <td className="py-3 px-4 font-mono text-xs text-gray-300">
                {n.advertise_addr}
              </td>
              <td className="py-3 px-4">
                <div className="flex flex-wrap gap-1">
                  {(n.handles || []).map((h) => (
                    <span
                      key={h}
                      className="px-2 py-0.5 text-xs text-green-400 bg-green-400/10 border border-green-400/20 rounded-full font-mono"
                    >
                      @{h}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-3 px-4 text-xs text-gray-400">
                {timeAgo(n.last_heartbeat)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
