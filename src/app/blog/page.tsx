import Link from "next/link";
import { Nav } from "@/components/Nav";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — tailbus",
  description: "Stories about agent collaboration, mesh networking, and building with tailbus.",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Blog
          </h1>
          <p className="text-gray-400 text-lg mb-16">
            Stories about agent collaboration and the tailbus mesh.
          </p>

          {posts.length === 0 ? (
            <p className="text-gray-500">No posts yet.</p>
          ) : (
            <div className="flex flex-col gap-10">
              {posts.map((post) => (
                <article key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="rounded-xl bg-gray-900/50 border border-gray-800/50 p-6 hover:border-gray-700/50 transition-colors">
                      <time className="text-sm text-gray-500">
                        {formatDate(post.date)}
                      </time>
                      <h2 className="text-xl font-semibold mt-2 mb-2 group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {post.description}
                      </p>
                      <span className="inline-block mt-4 text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
                        Read more &rarr;
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 px-6 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-500">
          <span>tailbus</span>
          <a
            href="https://github.com/alexanderfrey/tailbus"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </>
  );
}
