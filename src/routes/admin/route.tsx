import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/admin")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="dark flex min-h-svh bg-zinc-950 text-zinc-100">
			<div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,_rgba(99,102,241,0.18),_transparent_60%),radial-gradient(ellipse_60%_50%_at_85%_10%,_rgba(168,85,247,0.16),_transparent_55%),radial-gradient(ellipse_70%_50%_at_50%_100%,_rgba(14,165,233,0.10),_transparent_60%)]" />
			<div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,_black,_transparent_85%)]" />
			<SidebarProvider defaultOpen>
				<AdminSidebar />
				<SidebarInset className="bg-transparent">
					<section className="space-y-6 p-4 sm:p-6">
						<AdminHeader />
						<Outlet />
					</section>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
