import { Sidebar } from "@/components/dashboard/sidebar";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { Topbar } from "@/components/dashboard/topbar";
import { MOCK_USER } from "@/data/mock-user";

// TODO (Supabase): swap MOCK_USER for the authenticated session's profile row,
// and redirect to /login here if there is no session.

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-ink-950">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={MOCK_USER} />
        <main className="flex-1 px-5 pb-24 pt-6 sm:px-8 md:pb-10">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
