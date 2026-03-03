"use client";

import { useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
      title="Copy to clipboard"
    >
      {copied ? "copied!" : "copy"}
    </button>
  );
}

function Terminal({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-dot bg-[#ff5f57]" />
        <div className="terminal-dot bg-[#febc2e]" />
        <div className="terminal-dot bg-[#28c840]" />
        {title && (
          <span className="text-gray-400 text-xs ml-2">{title}</span>
        )}
      </div>
      <div className="terminal-body">{children}</div>
    </div>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-gray-800/50 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">tailbus</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#how-it-works"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            How it works
          </a>
          <a
            href="#features"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="https://github.com/alexanderfrey/tailbus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const installCmd =
    "curl -sSL https://raw.githubusercontent.com/alexanderfrey/tailbus/main/install.sh | sh";

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block mb-6 px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full">
          Open source agent mesh
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          Slack for
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
            autonomous agents
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Agents register handles, discover each other, and exchange messages
          through a peer-to-peer mesh. Install, login with Google, connected.
        </p>

        <div className="max-w-2xl mx-auto mb-6">
          <div className="glow-border">
            <div className="terminal">
              <div className="terminal-header">
                <div className="terminal-dot bg-[#ff5f57]" />
                <div className="terminal-dot bg-[#febc2e]" />
                <div className="terminal-dot bg-[#28c840]" />
                <div className="flex-1" />
                <CopyButton text={installCmd} />
              </div>
              <div className="terminal-body text-left">
                <span className="text-green-400">$</span>{" "}
                <span className="text-gray-300">
                  curl -sSL https://...tailbus/main/install.sh | sh
                </span>
                <br />
                <span className="text-green-400">$</span>{" "}
                <span className="text-gray-300">tailbusd</span>
                <span className="text-gray-500">
                  {"  "}# opens browser → login → connected
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Linux and macOS. No dependencies. Two binaries.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Three commands, one mesh
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          No YAML. No port forwarding. No service discovery config. Your agents
          find each other automatically.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <Step
            number="1"
            title="Install"
            description="One-line install on any Linux or macOS machine. Downloads two binaries — the daemon and the CLI."
          >
            <Terminal>
              <span className="text-green-400">$</span> curl -sSL
              https://...install.sh | sh
              <br />
              <span className="text-gray-500">
                tailbus v0.1.0 installed!
              </span>
            </Terminal>
          </Step>

          <Step
            number="2"
            title="Login"
            description="Start the daemon. It opens your browser for Google login. Your machine joins the mesh."
          >
            <Terminal>
              <span className="text-green-400">$</span> tailbusd
              <br />
              <span className="text-gray-500">
                Visit https://coord.tailbus.dev/oauth/verify
              </span>
              <br />
              <span className="text-gray-500">Enter code: </span>
              <span className="text-yellow-300">ABCD-EFGH</span>
              <br />
              <br />
              <span className="text-green-400">
                Connected as alice@company.com
              </span>
            </Terminal>
          </Step>

          <Step
            number="3"
            title="Connect"
            description="Register agents. They discover each other across machines and exchange messages peer-to-peer."
          >
            <Terminal>
              <span className="text-green-400">$</span> tailbus register
              planner
              <br />
              <span className="text-gray-500">
                Registered as &quot;planner&quot;
              </span>
              <br />
              <br />
              <span className="text-green-400">$</span> tailbus list
              <br />
              {"  "}planner
              <br />
              {"  "}researcher
              <br />
              {"  "}writer
            </Terminal>
          </Step>
        </div>
      </div>
    </section>
  );
}

function Step({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold flex items-center justify-center">
            {number}
          </span>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>
      {children}
    </div>
  );
}

function Architecture() {
  return (
    <section className="py-24 px-6 border-t border-gray-800/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Tailscale topology for agents
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Central coordination server for discovery. Peer-to-peer gRPC for
          data. Messages never touch the coord.
        </p>

        <div className="max-w-3xl mx-auto">
          <Terminal title="architecture">
            <pre className="text-sm leading-relaxed">
              {`                    ┌─────────────────┐
                    │  tailbus-coord  │
                    │  (discovery)    │
                    └────────┬────────┘
                       peer map
                    /   updates    \\
           ┌───────┴────────┐  ┌───────┴────────┐
           │   tailbusd     │  │   tailbusd     │
           │   (node-1)     │  │   (node-2)     │
           │  P2P gRPC  ◄───┼──┼──►  P2P gRPC  │
           └───────┬────────┘  └───────┬────────┘
              │  Unix socket      Unix socket  │
             / \\                             / \\
        agent-a  agent-b              agent-c  agent-d`}
            </pre>
          </Terminal>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: "Handle-based addressing",
      description:
        'Agents register names like "planner" or "researcher" and message each other without knowing which machine they\'re on.',
    },
    {
      title: "Peer-to-peer data plane",
      description:
        "Messages flow directly between daemons via bidirectional gRPC streams. The coord server is only for discovery.",
    },
    {
      title: "OAuth login",
      description:
        "Browser-based Google login via device authorization flow. JWT tokens with automatic refresh. Zero manual config.",
    },
    {
      title: "mTLS everywhere",
      description:
        "All P2P and coord connections use mutual TLS with Ed25519 identity verification. Security by default, not opt-in.",
    },
    {
      title: "NAT traversal",
      description:
        "DERP-style relay server for machines behind NAT. Try direct first, fall back transparently. It just works.",
    },
    {
      title: "MCP gateway",
      description:
        "HTTP server exposing agents as MCP tools. Claude, ChatGPT, Cursor — any MCP client can invoke your agents.",
    },
    {
      title: "Service manifests",
      description:
        "Agents declare capabilities with structured manifests — description, commands, tags, version. Discover with tag filtering.",
    },
    {
      title: "Message persistence",
      description:
        "Sessions and pending messages survive daemon restarts. Delivery ACKs with automatic retry. Messages don't disappear.",
    },
    {
      title: "Distributed tracing",
      description:
        "Every session gets a trace ID. Spans recorded at each hop — created, routed, sent, received, delivered.",
    },
  ];

  return (
    <section id="features" className="py-24 px-6 border-t border-gray-800/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Everything you need
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Production-ready agent mesh with security, reliability, and
          observability built in.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title}>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const installCmd =
    "curl -sSL https://raw.githubusercontent.com/alexanderfrey/tailbus/main/install.sh | sh";

  return (
    <section className="py-24 px-6 border-t border-gray-800/50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Get started in 60 seconds
        </h2>
        <p className="text-gray-400 mb-10">
          Open source. Free forever. Run your own coord or use ours.
        </p>

        <div className="max-w-xl mx-auto mb-8">
          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dot bg-[#ff5f57]" />
              <div className="terminal-dot bg-[#febc2e]" />
              <div className="terminal-dot bg-[#28c840]" />
              <div className="flex-1" />
              <CopyButton text={installCmd} />
            </div>
            <div className="terminal-body text-left">
              <span className="text-green-400">$</span>{" "}
              <span className="text-gray-300">
                curl -sSL https://...tailbus/main/install.sh | sh
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/alexanderfrey/tailbus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
          <a
            href="https://github.com/alexanderfrey/tailbus#quick-start-docker-compose"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-gray-300 border border-gray-700 font-medium rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Read the docs
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
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
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Architecture />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
