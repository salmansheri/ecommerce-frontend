import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, PackagePlus, Sparkles } from "lucide-react";
import { CreateProductForm } from "@/components/admin/create-product-form";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/products/create-product")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="space-y-1">
					<div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300">
						<Sparkles className="size-3.5" />
						Catalog
					</div>
					<h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
						Create new product
					</h1>
					<p className="text-sm text-zinc-400">
						Add a new item to your store. All required fields are marked with an
						asterisk.
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

			<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
				<CreateProductForm />

				<aside className="space-y-4">
					<div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 ring-1 ring-white/5">
						<div className="flex items-center gap-2 text-sm font-semibold text-white">
							<PackagePlus className="size-4 text-indigo-300" />
							Quick tips
						</div>
						<ul className="mt-3 space-y-2 text-sm text-zinc-400">
							<li className="flex gap-2">
								<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
								Use a clear, descriptive product name so customers can find it
								easily.
							</li>
							<li className="flex gap-2">
								<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
								Set the special price only when the product is on sale.
							</li>
							<li className="flex gap-2">
								<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-400" />
								Discount is a percentage between 0 and 100.
							</li>
							<li className="flex gap-2">
								<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
								Image URL should be a direct link to an image file.
							</li>
						</ul>
					</div>

					<div className="rounded-2xl border border-indigo-400/15 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-fuchsia-500/10 p-5 ring-1 ring-indigo-400/10">
						<p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300/80">
							Need inspiration?
						</p>
						<p className="mt-2 text-sm leading-6 text-zinc-300">
							Products with high-quality images and detailed descriptions
							typically convert at twice the rate of catalog entries with stock
							photos.
						</p>
					</div>
				</aside>
			</div>
		</>
	);
}
