import { Nav } from "@/components/Nav";

export const metadata = {
  title: "Pricing — tailbus",
  description:
    "Free for individuals. Team and enterprise plans for organizations running agents in production.",
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

function Tier({
  name,
  price,
  period,
  description,
  features,
  cta,
  ctaHref,
  highlighted,
  badge,
}: {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl p-8 flex flex-col ${
        highlighted
          ? "bg-blue-950/30 border-2 border-blue-500/40"
          : "bg-gray-900/50 border border-gray-800/50"
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/30 rounded-full">
            {badge}
          </span>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-bold tracking-tight">{price}</span>
          {period && <span className="text-gray-500 text-sm">{period}</span>}
        </div>
        <p className="text-sm text-gray-400 mt-3 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex flex-col gap-3 mb-8 flex-1">
        {features.map((f) => (
          <div key={f} className="flex items-start gap-2.5">
            <CheckIcon />
            <span className="text-sm text-gray-300">{f}</span>
          </div>
        ))}
      </div>
      <a
        href={ctaHref}
        target={ctaHref.startsWith("http") ? "_blank" : undefined}
        rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
        className={`block text-center px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
          highlighted
            ? "bg-blue-600 text-white hover:bg-blue-500"
            : "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700"
        }`}
      >
        {cta}
      </a>
    </div>
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
      a: "Any process that registers a handle with the daemon. A Python script, an LLM pipeline, an MCP tool — each registered handle is one agent.",
    },
    {
      q: "What happens if I hit the free tier limits?",
      a: "New agent registrations will be rejected once you reach 5 handles or 3 machines. Existing agents keep working. You can upgrade at any time to remove limits.",
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
              Free to start. Pay when your team grows.
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The core mesh is open source and always will be.
              Paid plans add team collaboration, governance, and managed
              infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Tier
              name="Free"
              price="$0"
              period="forever"
              description="For individuals exploring agent collaboration. Everything you need to get started."
              features={[
                "Up to 5 agents",
                "Up to 3 machines",
                "Shared coordination server",
                "NAT traversal via community relay",
                "MCP gateway for Claude & Cursor",
                "Google OAuth login",
                "Python SDK + CLI",
                "Community support",
              ]}
              cta="Get started"
              ctaHref="/getting-started"
            />

            <Tier
              name="Team"
              price="$49"
              period="/month"
              description="For teams running agents in production. Shared mesh, analytics, and priority infrastructure."
              features={[
                "Unlimited agents and machines",
                "Team mesh — multiple users, one network",
                "Session history and analytics dashboard",
                "Priority relay (faster NAT traversal)",
                "Webhook integrations",
                "Usage metrics and alerts",
                "Email support",
              ]}
              cta="Coming soon"
              ctaHref="#"
              highlighted
              badge="Most popular"
            />

            <Tier
              name="Enterprise"
              price="Custom"
              description="For organizations that need governance, compliance, and dedicated infrastructure."
              features={[
                "Everything in Team",
                "RBAC — control which agents can talk to which",
                "Full audit logs for every session",
                "SSO / SAML (Okta, Azure AD)",
                "Dedicated coordination server",
                "Data residency (EU / US)",
                "Custom SLA",
                "Dedicated support",
              ]}
              cta="Contact us"
              ctaHref="mailto:alex@tailbus.co"
            />
          </div>

          <div className="text-center mb-8">
            <p className="text-sm text-gray-500">
              All plans include the full open-source mesh. Self-hosting is
              always an option.
            </p>
          </div>
        </div>
      </main>

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
