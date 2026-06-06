import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/header";

export const Route = createFileRoute("/store")({
	component: StoreLayout,
});

function StoreLayout() {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
}
