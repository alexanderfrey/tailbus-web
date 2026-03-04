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
  title: "tailbus — Your agents are smart. Now make them a team.",
  description:
    "One install, and every agent you're running can discover each other by name and collaborate across departments. No endpoints, no networking code, no infrastructure to manage.",
  openGraph: {
    title: "tailbus — Your agents are smart. Now make them a team.",
    description:
      "One install, and every agent you're running can discover each other and collaborate across machines. No endpoints, no networking code.",
    url: "https://tailbus.co",
    siteName: "tailbus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "tailbus — Your agents are smart. Now make them a team.",
    description:
      "One install, and every agent you're running can discover each other and collaborate across machines. No endpoints, no networking code.",
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
                "Open-source mesh network that lets AI agents discover each other by name and collaborate across machines.",
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
