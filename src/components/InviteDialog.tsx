"use client";

import { useState } from "react";
import { createInvite } from "@/lib/api";
import { trackInviteGenerated } from "@/lib/analytics";

interface InviteDialogProps {
  open: boolean;
  teamId: string;
  onClose: () => void;
}

export function InviteDialog({ open, teamId, onClose }: InviteDialogProps) {
  const [maxUses, setMaxUses] = useState(5);
  const [ttlDays, setTtlDays] = useState(7);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await createInvite(teamId, maxUses, ttlDays * 86400);
      setCode(result.code);
      trackInviteGenerated(teamId);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to create invite");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setCode("");
    setError("");
    setCopied(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-white">Generate Invite</h3>

        {!code ? (
          <>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Max uses
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={maxUses}
                  onChange={(e) => setMaxUses(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Expires in (days)
                </label>
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={ttlDays}
                  onChange={(e) => setTtlDays(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400/50"
                />
              </div>
            </div>
            {error && (
              <p className="mt-3 text-sm text-red-400">{error}</p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-lg hover:bg-blue-400/20 transition-colors disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-3 text-sm text-gray-400">
              Share this code with the person you want to invite:
            </p>
            <div className="mt-3 flex items-center gap-2">
              <code className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white font-mono text-sm select-all">
                {code}
              </code>
              <button
                onClick={handleCopy}
                className="px-3 py-3 text-sm text-gray-400 hover:text-white bg-gray-800/50 border border-gray-700/50 rounded-lg transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Accept with: <code className="text-gray-400">tailbus team join {code}</code>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Or share this link:{" "}
              <code className="text-gray-400 select-all">
                {typeof window !== "undefined" ? window.location.origin : "https://tailbus.co"}/dashboard/invite?code={code}
              </code>
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-700/50 transition-colors"
              >
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
