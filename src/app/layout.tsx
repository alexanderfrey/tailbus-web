import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tailbus.co"),
  title: "tailbus — The communication plane for agents across runtimes, machines, and teams.",
  description:
    "Connect heterogeneous agent systems across machines, departments, and runtimes with shared identity, routing, rooms, policies, and observability.",
  openGraph: {
    title: "tailbus — The communication plane for agents across runtimes, machines, and teams.",
    description:
      "Connect heterogeneous agent systems across machines and departments. Shared identity, routing, rooms, and observability without custom network glue.",
    url: "https://tailbus.co",
    siteName: "tailbus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "tailbus — The communication plane for agents across runtimes, machines, and teams.",
    description:
      "Connect heterogeneous agent systems across machines and departments. Shared identity, routing, rooms, and observability without custom network glue.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "tailbus",
              url: "https://tailbus.co",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Linux, macOS",
              description:
                "Open-source communication plane that lets heterogeneous agent systems collaborate across machines, teams, and runtimes.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              sourceOrganization: {
                "@type": "Organization",
                name: "tailbus",
                url: "https://tailbus.co",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
