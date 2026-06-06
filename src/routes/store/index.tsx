import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/store/")({
	component: StoreIndex,
});

function StoreIndex() {
	return <Navigate to="/store/home" />;
}
