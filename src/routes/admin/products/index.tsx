import { createFileRoute } from "@tanstack/react-router";
import { AdminProductsTable } from "@/components/admin/admin-products-table";
import { useGetProducts } from "@/hooks/products/use-get-products";

export const Route = createFileRoute("/admin/products/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data, isLoading } = useGetProducts(0, 100, "", "");
	const products = data?.data ?? [];

	return <AdminProductsTable products={products} isLoading={isLoading} />;
}
