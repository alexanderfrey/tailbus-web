"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { acceptInvite } from "@/lib/api";
import { trackInviteAccepted } from "@/lib/analytics";

export default function AcceptInvitePage() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    team_id: string;
    team_name: string;
  } | null>(null);

  useEffect(() => {
    const codeParam = searchParams.get("code");
    if (codeParam) setCode(codeParam);
  }, [searchParams]);

  const handleAccept = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await acceptInvite(code.trim());
      setResult(res);
      trackInviteAccepted(res.team_id);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to accept invite");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="max-w-md">
        <h1 className="text-3xl font-bold text-white mb-2">Invite accepted</h1>
        <p className="text-gray-400 mb-6">
          You&apos;ve joined <span className="text-white font-medium">{result.team_name}</span>.
        </p>
        <Link
          href={`/dashboard/teams/${result.team_id}`}
          className="inline-flex px-4 py-2 text-sm font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-lg hover:bg-blue-400/20 transition-colors"
        >
          Go to team
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md">
      <h1 className="text-3xl font-bold text-white mb-2">Accept Invite</h1>
      <p className="text-gray-400 text-sm mb-6">
        Enter the invite code you received to join a team.
      </p>

      <form onSubmit={handleAccept} className="space-y-4">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Invite code"
          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white text-sm font-mono placeholder-gray-500 focus:outline-none focus:border-blue-400/50"
        />
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading || !code.trim()}
          className="px-4 py-2 text-sm font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-lg hover:bg-blue-400/20 transition-colors disabled:opacity-50"
        >
          {loading ? "Accepting..." : "Accept invite"}
        </button>
      </form>
    </div>
  );
}
