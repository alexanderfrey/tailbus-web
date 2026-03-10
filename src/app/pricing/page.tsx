import { Nav } from "@/components/Nav";
import { PricingTiers } from "@/components/PricingTiers";

export const metadata = {
  title: "Pricing — tailbus",
  description:
    "Open source mesh. Managed everything else. Free for individuals, team and enterprise plans for production.",
};

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="text-green-400/70 shrink-0 mt-0.5"
    >
      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
    </svg>
  );
}

function SelfHostComparison() {
  const rows = [
    { feature: "Agent mesh & P2P messaging", selfHost: true, managed: true },
    { feature: "Python SDK & CLI", selfHost: true, managed: true },
    { feature: "MCP gateway", selfHost: true, managed: true },
    { feature: "NAT traversal relay", selfHost: "Run your own", managed: "Managed, priority routing" },
    { feature: "Coordination server", selfHost: "Run your own", managed: "Managed, multi-region" },
    { feature: "Team identity & invites", selfHost: false, managed: true },
    { feature: "Analytics dashboard", selfHost: false, managed: true },
    { feature: "RBAC & audit logs", selfHost: false, managed: "Enterprise" },
    { feature: "SSO / SAML", selfHost: false, managed: "Enterprise" },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-3 text-center">
          Self-hosted vs managed
        </h2>
        <p className="text-gray-400 text-sm text-center mb-10 max-w-xl mx-auto">
          The mesh is fully open source — self-host everything if you want.
          Paid plans add the infrastructure and team features so you don&apos;t have to run them yourself.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800/50">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Feature</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">Self-hosted</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">Managed</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} className="border-b border-gray-800/30">
                  <td className="py-3 px-4 text-gray-300">{row.feature}</td>
                  <td className="py-3 px-4 text-center">
                    {row.selfHost === true ? (
                      <span className="text-green-400">
                        <CheckIcon />
                      </span>
                    ) : row.selfHost === false ? (
                      <span className="text-gray-600">&mdash;</span>
                    ) : (
                      <span className="text-gray-400 text-xs">{row.selfHost}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.managed === true ? (
                      <span className="text-green-400">
                        <CheckIcon />
                      </span>
                    ) : (
                      <span className="text-blue-400 text-xs">{row.managed}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Can I self-host everything?",
      a: "Yes. Tailbus is fully open source. You can run your own coordination server, relay, and daemons. The paid plans are for teams who want managed infrastructure and enterprise features without the operational overhead.",
    },
    {
      q: "What counts as an agent?",
      a: "Any process that registers a handle with the daemon. A Python script, an LLM pipeline, an MCP tool — each registered handle is one agent. If an agent disconnects and reconnects, it's still the same handle — it doesn't count twice.",
    },
    {
      q: "Do test and dev agents count toward limits?",
      a: "Yes — every registered handle counts. But with 15 agents on the free tier, most developers have plenty of room for both production and development handles.",
    },
    {
      q: "What happens if I hit the free tier limits?",
      a: "New agent registrations will be rejected once you reach 15 handles or 5 machines. Existing agents keep working. You can upgrade at any time to remove limits.",
    },
    {
      q: "Do messages pass through your servers?",
      a: "No. Messages flow peer-to-peer between daemons via encrypted gRPC. The coordination server only handles discovery and peer maps. When direct P2P isn't possible (NAT), messages route through an encrypted relay — but are never stored.",
    },
    {
      q: "Can I start free and upgrade later?",
      a: "Yes. Your agents, handles, and sessions carry over when you upgrade. No migration needed.",
    },
    {
      q: "What's the difference between Team and Enterprise?",
      a: "Team gives you unlimited agents, shared mesh access for your team, and analytics. Enterprise adds governance: RBAC (control which agents can talk to which), audit logs, SSO, dedicated infrastructure, and an SLA.",
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-gray-800/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-12 text-center">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-8">
          {items.map((item) => (
            <div key={item.q}>
              <h3 className="font-semibold text-gray-200 mb-2">{item.q}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <>
      <Nav />

      <main className="pt-32 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Open source mesh. Managed everything else.
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The core mesh, SDK, and daemon are open source and always will be.
              Paid plans add managed coordination, team identity, and
              enterprise governance.
            </p>
          </div>

          <PricingTiers />

          <div className="text-center mb-8">
            <p className="text-sm text-gray-500">
              All plans include the full open-source mesh. Self-hosting is
              always an option.
            </p>
          </div>
        </div>
      </main>

      <SelfHostComparison />

      <FAQ />

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
