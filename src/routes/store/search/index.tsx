import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SearchX } from "lucide-react";
import * as z from "zod";
import { LoaderWrapper } from "@/components/loader-wrapper";
import ProductCard from "@/components/productCard";
import { useGetProducts } from "@/hooks/products/use-get-products";

const searchSchema = z.object({
	q: z.string(),
});

export const Route = createFileRoute("/store/search/")({
	validateSearch: searchSchema,
	component: SearchPage,
});

function SearchPage() {
	const { q } = Route.useSearch();
	const hasQuery = q.length > 0;

	const { data: productsData, isLoading } = useGetProducts(
		0, 20, "", "", hasQuery ? q : undefined,
	)

	const productList = productsData?.data ?? [];

	if (!hasQuery) {
		return (
			<section className="min-h-screen bg-linear-to-b from-background via-background to-muted/30 px-4 py-10 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="rounded-3xl border border-dashed border-border/70 bg-card/50 p-16 text-center">
						<div className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
							<Search className="size-6" />
						</div>
						<h2 className="mt-5 text-xl font-semibold">Start searching</h2>
						<p className="mt-2 max-w-md mx-auto text-sm text-muted-foreground">
							Use the search bar in the header to find products you love.
						</p>
					</div>
				</div>
			</section>
		)
	}

	return (
		<section className="min-h-screen bg-linear-to-b from-background via-background to-muted/30 px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8">
					<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
						Results for &ldquo;{q}&rdquo;
					</h1>
				</div>

				<LoaderWrapper isLoading={isLoading}>
					{productList.length === 0 ? (
						<div className="rounded-3xl border border-dashed border-border/70 bg-card/50 p-16 text-center">
							<div className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
								<SearchX className="size-6" />
							</div>
							<h2 className="mt-5 text-xl font-semibold">
								No results for &ldquo;{q}&rdquo;
							</h2>
							<p className="mt-2 max-w-md mx-auto text-sm text-muted-foreground">
								Try adjusting your search terms or browse our catalog.
							</p>
							<Link
								to="/product"
								className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90"
							>
								Browse all products
							</Link>
						</div>
					) : (
						<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{productList.map((product) => (
								<ProductCard key={product.productId} product={product} />
							))}
						</div>
					)}
				</LoaderWrapper>
			</div>
		</section>
	)
}
