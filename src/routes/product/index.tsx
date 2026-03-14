import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { CustomSelect } from "@/components/custom-select";
import { LoaderWrapper } from "@/components/loader-wrapper";
import { PaginationUI } from "@/components/paginationUI";
import ProductCard from "@/components/productCard";
import { categories } from "@/lib/data/category";
import { products } from "@/lib/data/product";

const productSearchSchema = z.object({
	page: z.number().default(1),
	category: z.string().default(""),
	sortBy: z.string().default(""),
	sortOrder: z.string().default(""),
});

export const Route = createFileRoute("/product/")({
	component: RouteComponent,
	loader: () => {
		// throw new Error("Some went wrong")
	},
	validateSearch: zodValidator(productSearchSchema),
});

function RouteComponent() {
	const { page, category } = Route.useSearch();
	const isLoading = false;
	const pageSize = 10;
	const totalProducts = products.length;
	const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));
	const safePage = Math.min(Math.max(1, page), totalPages);
	const startIndex = (safePage - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize, totalProducts);
	const visibleProducts = products.slice(startIndex, endIndex);

	return (
		<section className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 px-4 py-10 sm:px-8 lg:px-14 lg:py-14">
			<div className="mx-auto max-w-7xl">
				<div className="rounded-3xl border bg-card/70 p-6 shadow-sm backdrop-blur sm:p-8">
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
						Storefront
					</p>
					<div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
						<div>
							<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
								Explore Products
							</h1>
							<p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
								Discover curated gadgets, accessories, and essentials with fast
								delivery and reliable support.
							</p>
						</div>
						<div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
							<div className="rounded-xl border bg-background/70 p-3 text-center">
								<p className="text-xl font-bold">{totalProducts}</p>
								<p className="text-xs text-muted-foreground">Products</p>
							</div>
							<div className="rounded-xl border bg-background/70 p-3 text-center">
								<p className="text-xl font-bold">{totalPages}</p>
								<p className="text-xs text-muted-foreground">Pages</p>
							</div>
							<div className="rounded-xl border bg-background/70 p-3 text-center col-span-2 sm:col-span-1">
								<p className="text-xl font-bold">{categories.length}</p>
								<p className="text-xs text-muted-foreground">Categories</p>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
					<div>
						<p className="text-sm font-medium">Browse by category</p>
						<p className="text-xs text-muted-foreground">
							Use category and page controls to navigate the catalog.
						</p>
					</div>
					<div className="flex flex-col items-center gap-3">
						<CustomSelect value={category} data={categories} />
						{category ? (
							<span className="min-w-[110px] rounded-full border bg-muted px-3 py-1 text-center text-xs font-medium text-muted-foreground">
								Category: {category}
							</span>
						) : (
							<span className="min-w-[110px] rounded-full border bg-muted px-3 py-1 text-center text-xs font-medium text-muted-foreground">
								All categories
							</span>
						)}
					</div>
				</div>

				<div className="mt-8 rounded-3xl border bg-card p-5 shadow-sm sm:p-6">
					<LoaderWrapper isLoading={isLoading}>
						<div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
							<p className="text-sm text-muted-foreground">
								Showing {startIndex + 1}-{endIndex} of {totalProducts} products
							</p>
							<p className="text-xs uppercase tracking-wide text-muted-foreground">
								Page {safePage} of {totalPages}
							</p>
						</div>
						<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
							{visibleProducts.map((product) => (
								<ProductCard key={product.productId} product={product} />
							))}
						</div>
						<div className="mt-8 border-t pt-4">
							<PaginationUI
								pageSize={pageSize}
								page={safePage}
								products={products}
							/>
						</div>
					</LoaderWrapper>
				</div>
			</div>
		</section>
	);
}
