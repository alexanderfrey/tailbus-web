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
  title: "tailbus — Agent communication mesh",
  description:
    "Connect your AI agents in seconds. Tailscale-style mesh networking for autonomous agents — install, login, connected.",
  openGraph: {
    title: "tailbus — Agent communication mesh",
    description:
      "Connect your AI agents in seconds. Tailscale-style mesh networking for autonomous agents.",
    url: "https://tailbus.dev",
    siteName: "tailbus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "tailbus — Agent communication mesh",
    description:
      "Connect your AI agents in seconds. Tailscale-style mesh networking for autonomous agents.",
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
        {children}
      </body>
    </html>
  );
}
