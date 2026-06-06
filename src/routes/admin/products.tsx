import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminProductsTable } from "@/components/admin/admin-products-table";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useGetProducts } from "@/hooks/products/use-get-products";

export const Route = createFileRoute("/admin/products")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data, isLoading } = useGetProducts(0, 20, "", "");
	const products = data?.data ?? [];

	return (
		<div className="min-h-svh bg-linear-to-br from-zinc-100 via-zinc-50 to-zinc-200 p-2 text-zinc-900 sm:p-4 lg:p-8 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:text-zinc-100">
			<div className="mx-auto w-full max-w-7xl">
				<SidebarProvider defaultOpen>
					<AdminSidebar />
					<SidebarInset className="rounded-xl border border-zinc-200/70 bg-transparent p-0 shadow-none sm:rounded-2xl dark:border-zinc-800">
						<section className="space-y-4 p-1 sm:space-y-6 sm:p-3">
							<AdminHeader />
							<AdminProductsTable products={products} isLoading={isLoading} />
						</section>
					</SidebarInset>
				</SidebarProvider>
			</div>
		</div>
	);
}
