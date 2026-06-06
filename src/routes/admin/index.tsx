import { createFileRoute } from "@tanstack/react-router";
import { AdminStats } from "@/components/admin/admin-stats";

export const Route = createFileRoute("/admin/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminStats />;
}
