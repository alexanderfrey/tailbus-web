"use client";

import { useAuth } from "@/components/AuthProvider";

export default function AccountPage() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-md">
      <h1 className="text-3xl font-bold text-white mb-6">Account</h1>

      <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <p className="text-white text-sm font-mono">{user?.email}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Auth status
          </label>
          <span className="inline-flex px-2 py-0.5 text-xs font-medium text-green-400 bg-green-400/10 border border-green-400/20 rounded-full">
            Authenticated
          </span>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={logout}
          className="px-4 py-2 text-sm font-medium text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg hover:bg-red-400/20 transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
