import { Nav } from "@/components/Nav";

const GITHUB_REPO = "alexanderfrey/tailbus";

interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string | null;
  body: string | null;
  published_at: string;
  html_url: string;
  prerelease: boolean;
  draft: boolean;
}

async function getReleases(): Promise<GitHubRelease[]> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/releases?per_page=50`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) return [];
  return res.json();
}

function parseChangelog(body: string): { hash: string; message: string }[] {
  const lines = body.split("\n").filter((l) => l.trim().startsWith("*"));
  return lines.map((line) => {
    const match = line.match(/\*\s+([a-f0-9]+)\s+(.*)/);
    if (!match) return { hash: "", message: line.replace(/^\*\s*/, "") };
    return { hash: match[1].slice(0, 8), message: match[2] };
  });
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const metadata = {
  title: "Releases — tailbus",
  description: "Release history and changelog for tailbus.",
};

export default async function ReleasesPage() {
  const releases = await getReleases();

  return (
    <>
      <Nav />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Releases
          </h1>
          <p className="text-gray-400 text-lg mb-16">
            Release history pulled from{" "}
            <a
              href={`https://github.com/${GITHUB_REPO}/releases`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              GitHub
            </a>
            .
          </p>

          {releases.length === 0 ? (
            <p className="text-gray-500">No releases found.</p>
          ) : (
            <div className="flex flex-col gap-16">
              {releases
                .filter((r) => !r.draft)
                .map((release) => {
                  const commits = release.body
                    ? parseChangelog(release.body)
                    : [];

                  return (
                    <article key={release.id} className="relative">
                      <div className="flex items-start gap-4 mb-6">
                        <a
                          href={release.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full hover:bg-blue-400/20 transition-colors"
                        >
                          {release.tag_name}
                        </a>
                        {release.prerelease && (
                          <span className="px-2 py-0.5 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full">
                            pre-release
                          </span>
                        )}
                        <span className="text-sm text-gray-500 mt-0.5">
                          {formatDate(release.published_at)}
                        </span>
                      </div>

                      {release.name && release.name !== release.tag_name && (
                        <h2 className="text-xl font-semibold mb-4">
                          {release.name}
                        </h2>
                      )}

                      {commits.length > 0 ? (
                        <div className="rounded-xl bg-gray-900/50 border border-gray-800/50 overflow-hidden">
                          <div className="divide-y divide-gray-800/50">
                            {commits.map((commit, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-3 px-5 py-3"
                              >
                                {commit.hash && (
                                  <a
                                    href={`https://github.com/${GITHUB_REPO}/commit/${commit.hash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-xs text-violet-400 bg-violet-400/10 px-1.5 py-0.5 rounded hover:bg-violet-400/20 transition-colors mt-0.5 shrink-0"
                                  >
                                    {commit.hash}
                                  </a>
                                )}
                                <p className="text-sm text-gray-300 leading-relaxed">
                                  {commit.message}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : release.body ? (
                        <div className="rounded-xl bg-gray-900/50 border border-gray-800/50 p-5">
                          <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
                            {release.body}
                          </p>
                        </div>
                      ) : null}
                    </article>
                  );
                })}
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 px-6 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-500">
          <span>tailbus</span>
          <a
            href={`https://github.com/${GITHUB_REPO}`}
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
