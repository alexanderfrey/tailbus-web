"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <p className="text-sm font-mono text-gray-500 mb-4">500</p>
      <h1 className="text-4xl font-bold text-white mb-3">
        Something went wrong
      </h1>
      <p className="text-gray-400 mb-8 max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-5 py-2.5 text-sm font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-lg hover:bg-blue-400/20 transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
