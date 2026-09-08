import { Sidebar } from "@/components/dashboard/sidebar";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { Topbar } from "@/components/dashboard/topbar";
import { getCurrentUser } from "@/lib/get-current-user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen bg-ink-950">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={user} />
        <main className="flex-1 px-5 pb-24 pt-6 sm:px-8 md:pb-10">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
