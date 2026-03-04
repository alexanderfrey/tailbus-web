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
        {children}
      </body>
    </html>
  );
}
