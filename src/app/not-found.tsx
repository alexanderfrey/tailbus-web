import Link from "next/link";
import { Nav } from "@/components/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-16 max-w-6xl mx-auto px-6 flex flex-col items-center justify-center min-h-[70vh] text-center">
        <p className="text-sm font-mono text-gray-500 mb-4">404</p>
        <h1 className="text-4xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 text-sm font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-lg hover:bg-blue-400/20 transition-colors"
        >
          Back to home
        </Link>
      </main>
    </>
  );
}
