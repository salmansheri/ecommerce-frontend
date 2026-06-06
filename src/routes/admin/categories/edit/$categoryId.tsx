import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Boxes, Lightbulb, Sparkles } from "lucide-react";
import { EditCategoryForm } from "@/components/admin/edit-category-form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategories } from "@/hooks/categories/use-get-categories";

export const Route = createFileRoute("/admin/categories/edit/$categoryId")({
	component: RouteComponent,
	beforeLoad: ({ params }) => {
		const id = Number(params.categoryId);
		if (Number.isNaN(id) || id <= 0) {
			throw notFound();
		}
	},
});

function RouteComponent() {
	const { categoryId } = Route.useParams();
	const id = Number(categoryId);
	const { data, isLoading, isError } = useGetCategories();
	const category = data?.data?.find((item) => item.id === id);

	return (
		<>
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="space-y-1">
					<div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300">
						<Sparkles className="size-3.5" />
						Catalog
					</div>
					<h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
						Edit category
					</h1>
					<p className="text-sm text-zinc-400">
						Update details for CAT-{categoryId}.
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

			{isLoading && (
				<div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-10 ring-1 ring-white/5">
					<div className="space-y-4">
						<Skeleton className="h-5 w-40 bg-zinc-800" />
						<Skeleton className="h-4 w-72 bg-zinc-800" />
						<div className="pt-4">
							<Skeleton className="h-10 w-full bg-zinc-800" />
						</div>
					</div>
				</div>
			)}

			{isError && (
				<div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-6 text-sm text-rose-200 ring-1 ring-rose-400/20">
					Failed to load this category. Please try again.
				</div>
			)}

			{!isLoading && !isError && !category && (
				<div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-10 text-center text-sm text-zinc-500 ring-1 ring-white/5">
					Category not found.
				</div>
			)}

			{category && (
				<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
					<EditCategoryForm category={category} />

					<aside className="space-y-4">
						<div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 ring-1 ring-white/5">
							<div className="flex items-center gap-2 text-sm font-semibold text-white">
								<Boxes className="size-4 text-indigo-300" />
								Editing CAT-{category.id}
							</div>
							<p className="mt-3 text-sm leading-6 text-zinc-400">
								You&apos;re editing{" "}
								<span className="font-medium text-zinc-200">
									{category.name}
								</span>
								. Changes are saved as a single update to the catalog.
							</p>
						</div>

						<div className="rounded-2xl border border-indigo-400/15 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-fuchsia-500/10 p-5 ring-1 ring-indigo-400/10">
							<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300/80">
								<Lightbulb className="size-3" />
								Heads up
							</div>
							<p className="mt-2 text-sm leading-6 text-zinc-300">
								Renaming a category keeps the same ID, so existing product
								assignments and URLs remain valid.
							</p>
						</div>
					</aside>
				</div>
			)}
		</>
	);
}
