import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { AuthProvider } from "@/components/AuthProvider";
import { DashboardDataProvider } from "@/components/DashboardDataProvider";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { LoginGate } from "@/components/LoginGate";

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
      <LoginGate>
        <DashboardDataProvider>
          <div className="pt-16 flex min-h-screen">
            <DashboardSidebar />
            <main className="flex-1 p-6 lg:p-8 overflow-auto">
              {children}
            </main>
          </div>
        </DashboardDataProvider>
      </LoginGate>
    </AuthProvider>
  );
}
