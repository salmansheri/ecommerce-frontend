import { createFileRoute } from "@tanstack/react-router";
import { Boxes, FolderTree, Layers, Sparkles, Tags } from "lucide-react";
import { AdminCategoriesTable } from "@/components/admin/admin-categories-table";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategories } from "@/hooks/categories/use-get-categories";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/categories/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data, isLoading } = useGetCategories();
	const categories = data?.data ?? [];
	const totalCategories = data?.totalElements ?? categories.length;

	const stats = [
		{
			label: "Total Categories",
			value: totalCategories,
			note: "Active groupings in the catalog",
			icon: Tags,
			glow: "from-indigo-500/20 via-indigo-500/5 to-transparent",
			iconClass:
				"bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-indigo-300 ring-indigo-400/30",
		},
		{
			label: "On this page",
			value: categories.length,
			note: "Loaded from the public API",
			icon: Layers,
			glow: "from-emerald-500/20 via-emerald-500/5 to-transparent",
			iconClass:
				"bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-300 ring-emerald-400/30",
		},
		{
			label: "Hierarchies",
			value: "Flat",
			note: "Top-level groupings only",
			icon: FolderTree,
			glow: "from-violet-500/20 via-violet-500/5 to-transparent",
			iconClass:
				"bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-violet-300 ring-violet-400/30",
		},
		{
			label: "Default icon",
			value: "Boxes",
			note: "Used for new categories",
			icon: Boxes,
			glow: "from-amber-500/20 via-amber-500/5 to-transparent",
			iconClass:
				"bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-300 ring-amber-400/30",
		},
	];

	return (
		<>
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="space-y-1">
					<div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300">
						<Sparkles className="size-3.5" />
						Catalog
					</div>
					<h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
						Categories
					</h1>
					<p className="text-sm text-zinc-400">
						Organize products into searchable groupings across the storefront.
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
				{stats.map((item) => (
					<Card
						key={item.label}
						className="group relative overflow-hidden rounded-2xl border-white/10 bg-zinc-900/60 shadow-[0_20px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/5 transition-all hover:border-white/20 hover:shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
					>
						<div
							className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${item.glow} blur-2xl opacity-60 transition-opacity group-hover:opacity-100`}
						/>
						<CardContent className="relative space-y-3 p-5">
							<div className="flex items-start justify-between gap-3">
								<div>
									<p className="text-sm font-medium text-zinc-400">
										{item.label}
									</p>
									<p className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
										{isLoading ? (
											<Skeleton className="h-8 w-16 bg-zinc-800" />
										) : (
											item.value
										)}
									</p>
								</div>
								<div className={cn("rounded-2xl p-3 ring-1", item.iconClass)}>
									<item.icon className="size-5" />
								</div>
							</div>
							<p className="text-xs text-zinc-500">{item.note}</p>
						</CardContent>
					</Card>
				))}
			</div>

			<AdminCategoriesTable categories={categories} isLoading={isLoading} />
		</>
	);
}
