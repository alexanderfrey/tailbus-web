import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
