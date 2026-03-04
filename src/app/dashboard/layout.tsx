import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Dashboard — tailbus",
  description: "Manage your tailbus teams, members, and nodes.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Nav />
      <main className="pt-24 pb-16 max-w-6xl mx-auto px-6">{children}</main>
    </AuthProvider>
  );
}
