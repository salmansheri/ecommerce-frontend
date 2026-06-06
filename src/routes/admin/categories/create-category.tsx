import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Boxes, Lightbulb, Sparkles } from "lucide-react";
import { CreateCategoryForm } from "@/components/admin/create-category-form";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/categories/create-category")({
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
						Create new category
					</h1>
					<p className="text-sm text-zinc-400">
						Add a new grouping to organise products across the storefront.
					</p>
				</div>
				<Button
					asChild
					variant="outline"
					className="h-10 w-fit rounded-xl border-white/10 bg-white/5 text-zinc-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
				>
					<Link to="/admin/categories">
						<ArrowLeft className="mr-2 size-4" />
						Back to categories
					</Link>
				</Button>
			</div>

			<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
				<CreateCategoryForm />

				<aside className="space-y-4">
					<div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 ring-1 ring-white/5">
						<div className="flex items-center gap-2 text-sm font-semibold text-white">
							<Boxes className="size-4 text-indigo-300" />
							Quick tips
						</div>
						<ul className="mt-3 space-y-2 text-sm text-zinc-400">
							<li className="flex gap-2">
								<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
								Keep category names short and customer-friendly.
							</li>
							<li className="flex gap-2">
								<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
								Avoid duplicating existing categories — search before adding.
							</li>
							<li className="flex gap-2">
								<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-400" />
								The slug is auto-generated from the name and is used in URLs.
							</li>
						</ul>
					</div>

					<div className="rounded-2xl border border-indigo-400/15 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-fuchsia-500/10 p-5 ring-1 ring-indigo-400/10">
						<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300/80">
							<Lightbulb className="size-3" />
							Heads up
						</div>
						<p className="mt-2 text-sm leading-6 text-zinc-300">
							Once created, the category is available immediately to assign
							products to. Make sure the storefront navigation is updated to
							expose it.
						</p>
					</div>
				</aside>
			</div>
		</>
	);
}
