"use client";

import { useState } from "react";
import { WaitlistDialog } from "./WaitlistDialog";

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
  onCtaClick,
  highlighted,
}: {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  highlighted?: boolean;
}) {
  const buttonClass = `block w-full text-center px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
    highlighted
      ? "bg-blue-600 text-white hover:bg-blue-500"
      : "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700"
  }`;

  return (
    <div
      className={`relative rounded-2xl p-8 flex flex-col ${
        highlighted
          ? "bg-blue-950/30 border-2 border-blue-500/40"
          : "bg-gray-900/50 border border-gray-800/50"
      }`}
    >
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
      {onCtaClick ? (
        <button onClick={onCtaClick} className={buttonClass}>
          {cta}
        </button>
      ) : (
        <a
          href={ctaHref}
          target={ctaHref?.startsWith("http") ? "_blank" : undefined}
          rel={ctaHref?.startsWith("http") ? "noopener noreferrer" : undefined}
          className={buttonClass}
        >
          {cta}
        </a>
      )}
    </div>
  );
}

export function PricingTiers() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <Tier
          name="Free"
          price="$0"
          period="forever"
          description="For individuals and small projects. Enough room to build real prototypes and ship to production."
          features={[
            "Up to 15 agents",
            "Up to 5 machines",
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
          cta="Join waitlist"
          onCtaClick={() => setWaitlistOpen(true)}
          highlighted
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

      <WaitlistDialog
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />
    </>
  );
}
