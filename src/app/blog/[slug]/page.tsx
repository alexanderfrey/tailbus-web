import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Nav } from "@/components/Nav";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { meta } = getPostBySlug(slug);
    return {
      title: `${meta.title} — tailbus`,
      description: meta.description,
    };
  } catch {
    return { title: "Post not found — tailbus" };
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { meta, content } = post;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    author: { "@type": "Person", name: meta.author },
    publisher: {
      "@type": "Organization",
      name: "tailbus",
      url: "https://tailbus.co",
    },
    url: `https://tailbus.co/blog/${slug}`,
  };

  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <time className="text-sm text-gray-500">
              {formatDate(meta.date)}
            </time>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-3 mb-4">
              {meta.title}
            </h1>
            <p className="text-gray-400 text-lg">{meta.description}</p>
            <p className="text-sm text-gray-500 mt-4">By {meta.author}</p>
          </header>

          <div className="prose-custom">
            <MDXRemote source={content} />
          </div>
        </article>
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
