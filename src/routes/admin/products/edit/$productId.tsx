import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, PackagePlus, Sparkles } from "lucide-react";
import { EditProductForm } from "@/components/admin/edit-product-form";
import { Button } from "@/components/ui/button";
import { useGetProductById } from "@/hooks/products/use-get-product-by-id";

export const Route = createFileRoute("/admin/products/edit/$productId")({
	component: RouteComponent,
	beforeLoad: ({ params }) => {
		const id = Number(params.productId);
		if (Number.isNaN(id) || id <= 0) {
			throw notFound();
		}
	},
});

function RouteComponent() {
	const { productId } = Route.useParams();
	const id = Number(productId);
	const { data: product, isLoading, isError } = useGetProductById(id);

	return (
		<>
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="space-y-1">
					<div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300">
						<Sparkles className="size-3.5" />
						Catalog
					</div>
					<h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
						Edit product
					</h1>
					<p className="text-sm text-zinc-400">
						Update details for PRD-{productId}.
					</p>
				</div>
				<Button
					asChild
					variant="outline"
					className="h-10 w-fit rounded-xl border-white/10 bg-white/5 text-zinc-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
				>
					<Link to="/admin/products">
						<ArrowLeft className="mr-2 size-4" />
						Back to products
					</Link>
				</Button>
			</div>

			{isLoading && (
				<div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-10 text-center text-sm text-zinc-500 ring-1 ring-white/5">
					Loading product...
				</div>
			)}

			{isError && (
				<div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-6 text-sm text-rose-200 ring-1 ring-rose-400/20">
					Failed to load this product. It may have been deleted or the ID is
					invalid.
				</div>
			)}

			{!isLoading && !isError && !product && (
				<div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-10 text-center text-sm text-zinc-500 ring-1 ring-white/5">
					Product not found.
				</div>
			)}

			{product && (
				<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
					<EditProductForm product={product} />

					<aside className="space-y-4">
						<div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 ring-1 ring-white/5">
							<div className="flex items-center gap-2 text-sm font-semibold text-white">
								<PackagePlus className="size-4 text-indigo-300" />
								Editing PRD-{product.productId}
							</div>
							<p className="mt-3 text-sm leading-6 text-zinc-400">
								You&apos;re editing{" "}
								<span className="font-medium text-zinc-200">
									{product.name}
								</span>
								. Changes are saved as a single update to the catalog.
							</p>
						</div>

						<div className="rounded-2xl border border-indigo-400/15 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-fuchsia-500/10 p-5 ring-1 ring-indigo-400/10">
							<p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300/80">
								Heads up
							</p>
							<p className="mt-2 text-sm leading-6 text-zinc-300">
								Updating price or quantity is immediate. Consider coordinating
								stock changes with the fulfillment team to avoid overselling.
							</p>
						</div>
					</aside>
				</div>
			)}
		</>
	);
}
