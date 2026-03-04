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
          Open source &middot; Works with A2A + MCP
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
          Make your agents
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
            reachable from anywhere
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          Spin up an agent on any machine, give it a name, and it&apos;s
          instantly discoverable and reachable by every other agent you&apos;re
          running — without configuring a single endpoint, opening a single
          port, or writing a single line of networking code.
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
                <span className="text-gray-200 font-medium text-base sm:text-lg">
                  {installCmd}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Linux and macOS. No dependencies. Two binaries.
        </p>

        <p className="text-sm text-gray-500">
          Then run{" "}
          <code className="text-gray-300 bg-gray-800 px-1.5 py-0.5 rounded">
            tailbusd
          </code>{" "}
          to start the daemon — it opens your browser, you login with Google,
          and you&apos;re connected.
        </p>
      </div>
    </section>
  );
}

function FourProblems() {
  const facets = [
    {
      label: "Networking",
      description:
        "Stable endpoints, TLS, NAT traversal. Getting agent-to-agent traffic flowing across home NATs, corporate firewalls, and cloud VPCs without port forwarding or reverse proxies.",
      color: "text-blue-400",
      borderColor: "border-blue-500/30",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Discovery",
      description:
        "How does agent A find agent B? And how does agent C join a conversation it wasn't part of? Agents register handles and discover each other automatically — and can recruit new agents mid-session with @-mentions.",
      color: "text-violet-400",
      borderColor: "border-violet-500/30",
      bgColor: "bg-violet-500/10",
    },
    {
      label: "Identity",
      description:
        "Who is this agent, and should I trust it? Authentication, authorization, and mutual TLS — so agents can verify each other without you wiring up an auth layer.",
      color: "text-cyan-400",
      borderColor: "border-cyan-500/30",
      bgColor: "bg-cyan-500/10",
    },
    {
      label: "Sessions",
      description:
        "Multi-turn, structured interactions — not just fire-and-forget API calls. Agents need to open a session, exchange messages, and resolve it when the work is done.",
      color: "text-emerald-400",
      borderColor: "border-emerald-500/30",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-gray-800/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          One problem, four parts
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-3xl mx-auto text-lg leading-relaxed">
          Getting agents to talk to each other across machines today means
          solving four things yourself. Tailbus handles all four with one
          install.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {facets.map((f) => (
            <div
              key={f.label}
              className={`p-6 rounded-xl bg-gray-900/50 border ${f.borderColor}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${f.bgColor} ${f.color}`}
                >
                  {f.label}
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-gray-500 text-center mt-10 text-sm max-w-2xl mx-auto">
          Each of these has a point solution — Tailscale for networking, A2A for
          protocol, OAuth for auth. But nobody bundles them for the person
          running 3–10 agents across a laptop, a home server, and a cloud VM
          who doesn&apos;t want to become a DevOps engineer to make them
          collaborate.
        </p>
      </div>
    </section>
  );
}

function ChatMessage({
  handle,
  color,
  meta,
  children,
}: {
  handle: string;
  color: string;
  meta?: string;
  children: React.ReactNode;
}) {
  const colorMap: Record<string, { badge: string; border: string }> = {
    blue: { badge: "bg-blue-500/15 text-blue-400 border-blue-500/30", border: "border-blue-500/20" },
    violet: { badge: "bg-violet-500/15 text-violet-400 border-violet-500/30", border: "border-violet-500/20" },
    amber: { badge: "bg-amber-500/15 text-amber-400 border-amber-500/30", border: "border-amber-500/20" },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className={`chat-msg border-l-2 ${c.border} pl-4 py-2`}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded border ${c.badge}`}>
          {handle}
        </span>
        {meta && <span className="text-[11px] text-gray-600">{meta}</span>}
      </div>
      <div className="text-sm text-gray-300 leading-relaxed">{children}</div>
    </div>
  );
}

function UseCase() {
  return (
    <section className="py-24 px-6 border-t border-gray-800/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Agents that recruit each other
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Two agents are working through a product launch. Mid-session, they
          @-mention finance — the mesh auto-opens a session to it, wherever
          it lives.
        </p>

        <div className="grid md:grid-cols-[1fr,280px] gap-8 items-start">
          <div className="rounded-xl bg-[#0c1222] border border-gray-800/60 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-800/60 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400/80" />
              <span className="text-xs text-gray-400 font-medium">
                session &middot; product-launch-q3
              </span>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <ChatMessage handle="strategy" color="blue" meta="your-mac &middot; 192.168.1.x">
                We need to finalize the Q3 launch plan. Target date is July 15.
                Can you draft the go-to-market timeline?
              </ChatMessage>

              <ChatMessage handle="marketing" color="violet" meta="cloud-vm &middot; 10.0.0.x">
                Draft timeline ready. Phases: awareness (June 1–15), pre-launch
                (June 16–30), launch week (July 7–15). I need budget numbers
                for the paid media allocation before I can finalize the
                awareness phase.
              </ChatMessage>

              <ChatMessage handle="strategy" color="blue">
                Makes sense. Let me pull in finance.{" "}
                <span className="text-amber-400 font-semibold">@finance</span>{" "}
                What&apos;s the remaining Q3 marketing budget? We need the paid
                media line item specifically.
              </ChatMessage>

              <div className="flex items-center gap-3 py-1 px-1">
                <div className="h-px flex-1 bg-amber-500/20" />
                <span className="text-[11px] text-amber-400/70 whitespace-nowrap font-medium">
                  session opened to finance &middot; home-server &middot; 172.16.0.x
                </span>
                <div className="h-px flex-1 bg-amber-500/20" />
              </div>

              <ChatMessage handle="finance" color="amber" meta="home-server &middot; 172.16.0.x">
                Q3 marketing budget has $48,200 remaining. Paid media line item
                is $22,000 unallocated. Want me to place a hold for the launch
                campaign?
              </ChatMessage>

              <ChatMessage handle="marketing" color="violet">
                Yes, hold $18,000 against paid media — that covers the awareness
                and pre-launch phases. I&apos;ll send the final allocation
                breakdown in the next session.
              </ChatMessage>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-xl bg-gray-900/50 border border-gray-800/50 p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Three machines
              </h3>
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="text-gray-400">
                    <span className="text-blue-400 font-medium">strategy</span>{" "}
                    on your Mac
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span className="text-gray-400">
                    <span className="text-violet-400 font-medium">marketing</span>{" "}
                    on a cloud VM
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-gray-400">
                    <span className="text-amber-400 font-medium">finance</span>{" "}
                    on a home server
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gray-900/50 border border-gray-800/50 p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                What happened
              </h3>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <p>
                  <span className="text-blue-400">strategy</span> and{" "}
                  <span className="text-violet-400">marketing</span> were
                  mid-session.
                </p>
                <p>
                  strategy @-mentioned{" "}
                  <span className="text-amber-400">finance</span> — the mesh
                  auto-opened a session to it on a different machine, behind a
                  different NAT.
                </p>
                <p>
                  No agent knew the others&apos; IPs. No one configured an
                  endpoint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 border-t border-gray-800/50">
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
                Visit https://coord.tailbus.co/oauth/verify
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
            description="Register agents by name. They discover each other across machines and open sessions peer-to-peer."
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
          Tailscale for agents, speaking A2A
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Central coordination for discovery. Peer-to-peer gRPC for data.
          No custom protocol — just A2A over a mesh that handles the hard parts.
        </p>

        <div className="max-w-4xl mx-auto">
          <svg
            viewBox="0 0 800 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="bgGrad" x1="0" y1="0" x2="800" y2="480" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0c1222" />
                <stop offset="100%" stopColor="#111827" />
              </linearGradient>
              <linearGradient id="coordGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e3a5f" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="nodeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1a1f3d" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="p2pGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="agentGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0d2818" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="mcpGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2a1f0d" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              {/* Glow filters */}
              <filter id="glowBlue" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feFlood floodColor="#3b82f6" floodOpacity="0.3" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glowCyan" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor="#22d3ee" floodOpacity="0.4" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glowGreen" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor="#34d399" floodOpacity="0.25" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glowAmber" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor="#f59e0b" floodOpacity="0.25" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Subtle grid pattern */}
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" />
              </pattern>
            </defs>

            {/* Background with grid */}
            <rect width="800" height="480" rx="16" fill="url(#bgGrad)" />
            <rect width="800" height="480" rx="16" fill="url(#grid)" />

            {/* Coord → Node dashed lines (discovery) */}
            <line x1="345" y1="104" x2="200" y2="180" stroke="#334155" strokeWidth="1" strokeDasharray="6 6" className="arch-flow-down" />
            <line x1="455" y1="104" x2="600" y2="180" stroke="#334155" strokeWidth="1" strokeDasharray="6 6" className="arch-flow-down" />
            <text x="248" y="138" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="500">peer map</text>
            <text x="552" y="138" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="500">peer map</text>

            {/* Coord server */}
            <g filter="url(#glowBlue)">
              <rect x="290" y="36" width="220" height="68" rx="12" fill="url(#coordGrad)" stroke="#3b82f6" strokeWidth="1" />
            </g>
            <text x="400" y="64" textAnchor="middle" fill="#93c5fd" fontSize="15" fontWeight="600" fontFamily="system-ui, sans-serif">tailbus-coord</text>
            <text x="400" y="84" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="system-ui, sans-serif">discovery + peer maps</text>

            {/* P2P connection — animated flow */}
            <g filter="url(#glowCyan)">
              <line x1="325" y1="215" x2="475" y2="215" stroke="url(#p2pGrad)" strokeWidth="2" strokeDasharray="8 4" className="arch-flow-p2p" />
            </g>
            <polygon points="472,209 480,215 472,221" fill="#22d3ee" />
            <polygon points="328,209 320,215 328,221" fill="#8b5cf6" />

            {/* P2P label */}
            <rect x="335" y="196" width="130" height="20" rx="4" fill="#0c1222" fillOpacity="0.8" />
            <text x="400" y="210" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif" letterSpacing="0.5">P2P gRPC + mTLS</text>

            {/* Node 1 */}
            <g filter="url(#glowBlue)">
              <rect x="60" y="180" width="264" height="76" rx="12" fill="url(#nodeGrad)" stroke="#8b5cf6" strokeWidth="1" />
            </g>
            <text x="192" y="206" textAnchor="middle" fill="#c4b5fd" fontSize="14" fontWeight="700" fontFamily="system-ui, sans-serif">tailbusd</text>
            <text x="192" y="224" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="system-ui, sans-serif">your-mac</text>
            <text x="192" y="244" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="system-ui, sans-serif">192.168.1.x &middot; behind NAT</text>

            {/* Node 2 */}
            <g filter="url(#glowBlue)">
              <rect x="476" y="180" width="264" height="76" rx="12" fill="url(#nodeGrad)" stroke="#8b5cf6" strokeWidth="1" />
            </g>
            <text x="608" y="206" textAnchor="middle" fill="#c4b5fd" fontSize="14" fontWeight="700" fontFamily="system-ui, sans-serif">tailbusd</text>
            <text x="608" y="224" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="system-ui, sans-serif">cloud-gpu</text>
            <text x="608" y="244" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="system-ui, sans-serif">10.0.0.x &middot; private VPC</text>

            {/* Unix socket lines — Node 1 */}
            <line x1="120" y1="256" x2="100" y2="308" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" className="arch-flow-down" />
            <line x1="192" y1="256" x2="192" y2="308" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" className="arch-flow-down" />
            <line x1="264" y1="256" x2="284" y2="308" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" className="arch-flow-down" />

            {/* Unix socket lines — Node 2 */}
            <line x1="540" y1="256" x2="516" y2="308" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" className="arch-flow-down" />
            <line x1="676" y1="256" x2="700" y2="308" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" className="arch-flow-down" />

            {/* Agent: planner */}
            <g filter="url(#glowGreen)">
              <rect x="64" y="312" width="72" height="36" rx="18" fill="url(#agentGrad)" stroke="#34d399" strokeWidth="1" />
            </g>
            <text x="100" y="335" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">planner</text>

            {/* Agent: coder */}
            <g filter="url(#glowGreen)">
              <rect x="156" y="312" width="72" height="36" rx="18" fill="url(#agentGrad)" stroke="#34d399" strokeWidth="1" />
            </g>
            <text x="192" y="335" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">coder</text>

            {/* MCP gateway */}
            <g filter="url(#glowAmber)">
              <rect x="248" y="312" width="72" height="36" rx="18" fill="url(#mcpGrad)" stroke="#f59e0b" strokeWidth="1" />
            </g>
            <text x="284" y="329" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">MCP</text>
            <text x="284" y="341" textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="system-ui, sans-serif">gateway</text>

            {/* Agent: researcher */}
            <g filter="url(#glowGreen)">
              <rect x="476" y="312" width="80" height="36" rx="18" fill="url(#agentGrad)" stroke="#34d399" strokeWidth="1" />
            </g>
            <text x="516" y="335" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">researcher</text>

            {/* Agent: writer */}
            <g filter="url(#glowGreen)">
              <rect x="664" y="312" width="72" height="36" rx="18" fill="url(#agentGrad)" stroke="#34d399" strokeWidth="1" />
            </g>
            <text x="700" y="335" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">writer</text>

            {/* Claude / Cursor — MCP client */}
            <line x1="284" y1="348" x2="284" y2="384" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" className="arch-flow-down" />
            <g filter="url(#glowAmber)">
              <rect x="204" y="388" width="160" height="40" rx="10" fill="url(#mcpGrad)" stroke="#f59e0b" strokeWidth="1" />
            </g>
            <text x="284" y="413" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="600" fontFamily="system-ui, sans-serif">Claude / Cursor</text>

            {/* Layer labels */}
            <text x="28" y="70" fill="#334155" fontSize="10" fontWeight="500" fontFamily="system-ui, sans-serif" transform="rotate(-90 28 70)">CONTROL</text>
            <text x="28" y="218" fill="#334155" fontSize="10" fontWeight="500" fontFamily="system-ui, sans-serif" transform="rotate(-90 28 218)">DATA</text>
            <text x="28" y="340" fill="#334155" fontSize="10" fontWeight="500" fontFamily="system-ui, sans-serif" transform="rotate(-90 28 340)">AGENTS</text>

            {/* Subtle layer dividers */}
            <line x1="50" y1="150" x2="760" y2="150" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 6" />
            <line x1="50" y1="290" x2="760" y2="290" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 6" />
          </svg>
        </div>
      </div>
    </section>
  );
}

function MCPHighlight() {
  return (
    <section className="py-24 px-6 border-t border-gray-800/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-2.5 py-0.5 text-xs font-medium text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded-full">
              Built-in MCP gateway
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Your agents, inside Claude and Cursor
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Every Tailbus node includes an HTTP server that exposes your agents
              as MCP tools. Any MCP-compatible client — Claude, ChatGPT, Cursor —
              can invoke agents on your mesh without any extra setup.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Register an agent on a cloud GPU, and it&apos;s immediately
              available as a tool in your IDE. The mesh handles routing,
              auth, and NAT traversal behind the scenes.
            </p>
          </div>
          <div>
            <Terminal title="mcp-config.json">
              <pre className="text-sm leading-relaxed">
{`{
  "mcpServers": {
    "tailbus": {
      "url": "http://localhost:1423/mcp"
    }
  }
}`}
              </pre>
            </Terminal>
            <p className="text-xs text-gray-500 mt-3 text-center">
              One endpoint. All your agents as tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const heroFeatures = [
    {
      title: "Handles + @-mentions",
      description:
        'Agents register names like "planner" or "marketing." Two agents mid-session can pull in a third with @marketing — the mesh auto-opens a session to it, wherever it lives. Agents recruit each other by name without knowing machines, IPs, or endpoints.',
    },
    {
      title: "NAT traversal + mTLS",
      description:
        "Agents behind home NATs, corporate firewalls, or private VPCs connect without port forwarding. DERP-style relay with direct connection upgrade. All connections use mutual TLS with Ed25519 identity verification.",
    },
    {
      title: "Structured sessions",
      description:
        "Agents open sessions, exchange messages across multiple turns, and resolve them when the work is done. Not fire-and-forget — real multi-turn collaboration with delivery ACKs and persistence across restarts.",
    },
  ];

  const otherFeatures = [
    "Peer-to-peer gRPC data plane — messages never touch the coord server",
    "OAuth login — browser-based Google auth with automatic JWT refresh",
    "Service manifests — agents declare capabilities, commands, tags, and version",
    "Message persistence — sessions and pending messages survive daemon restarts",
    "Delivery ACKs — automatic retry with at-least-once delivery guarantees",
    "Distributed tracing — every session gets a trace ID with per-hop spans",
  ];

  return (
    <section id="features" className="py-24 px-6 border-t border-gray-800/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          The infrastructure you&apos;d build anyway
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Everything between &ldquo;my agent works locally&rdquo; and
          &ldquo;my agents collaborate across machines.&rdquo;
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {heroFeatures.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-xl bg-gray-900/50 border border-gray-800/50"
            >
              <h3 className="font-semibold mb-3 text-lg">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
            Also included
          </h3>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {otherFeatures.map((f) => (
              <div key={f} className="flex items-start gap-2">
                <span className="text-blue-400/60 mt-1 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                  </svg>
                </span>
                <span className="text-sm text-gray-400">{f}</span>
              </div>
            ))}
          </div>
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
          Stop yak-shaving, start shipping agents
        </h2>
        <p className="text-gray-400 mb-10">
          Open source. Self-hostable. Free tier always available.
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
              <span className="text-gray-200 font-medium">
                {installCmd}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
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

        <p className="text-sm text-gray-600">
          Built in Go. v0.1.0. We&apos;re just getting started.
        </p>
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
        <FourProblems />
        <UseCase />
        <HowItWorks />
        <Architecture />
        <MCPHighlight />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
