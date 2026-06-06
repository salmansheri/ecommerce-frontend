import { useNavigate } from "@tanstack/react-router";
import {
	Boxes,
	Filter,
	Hash,
	Loader,
	MoreHorizontal,
	Pencil,
	Plus,
	Search,
	Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { CategoryDto } from "@/generated";
import { useDeleteCategory } from "@/hooks/categories/use-delete-category";

interface AdminCategoriesTableProps {
	categories: CategoryDto[];
	isLoading?: boolean;
}

export function AdminCategoriesTable({
	categories,
	isLoading = false,
}: AdminCategoriesTableProps) {
	const navigate = useNavigate();
	const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();
	const [query, setQuery] = useState("");
	const [categoryToDelete, setCategoryToDelete] = useState<CategoryDto | null>(
		null,
	);

	const filteredCategories = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) {
			return categories;
		}
		return categories.filter((category) => {
			const name = category.name?.toLowerCase() ?? "";
			const id = category.id?.toString() ?? "";
			return name.includes(q) || id.includes(q);
		});
	}, [categories, query]);

	const handleConfirmDelete = () => {
		if (!categoryToDelete?.id) {
			return;
		}
		deleteCategory(
			{ path: { categoryId: categoryToDelete.id } },
			{
				onSettled: () => setCategoryToDelete(null),
			},
		);
	};

	return (
		<>
			<div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900/60 shadow-[0_24px_50px_rgba(0,0,0,0.4)] ring-1 ring-white/5">
				<div className="pointer-events-none absolute -top-20 left-1/3 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
				<div className="relative flex flex-col gap-3 border-b border-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">
							Category Catalog
						</h2>
						<p className="text-xs text-zinc-500 sm:text-sm">
							{isLoading ? (
								<Skeleton className="inline-block h-3 w-32 bg-zinc-800" />
							) : (
								<>
									{filteredCategories.length} of {categories.length} categories
								</>
							)}
						</p>
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<div className="relative">
							<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
							<Input
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Search by name or ID..."
								className="h-10 w-full rounded-xl border-white/10 bg-zinc-950/50 pl-9 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-indigo-400/40 focus-visible:ring-indigo-400/20 sm:w-64"
							/>
						</div>
						<Button
							variant="outline"
							size="icon"
							className="h-10 w-10 rounded-xl border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
							aria-label="Filter"
						>
							<Filter className="size-4" />
						</Button>
						<Button
							onClick={() =>
								navigate({ to: "/admin/categories/create-category" })
							}
							className="h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-[0_8px_24px_rgba(99,102,241,0.35)] hover:from-indigo-400 hover:to-violet-400"
						>
							<Plus className="size-4" />
							Add Category
						</Button>
					</div>
				</div>

				<div className="relative p-2 sm:p-4">
					<Table>
						<TableHeader>
							<TableRow className="border-white/5 hover:bg-transparent">
								<TableHead className="text-zinc-500">Category</TableHead>
								<TableHead className="text-zinc-500">Slug</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading &&
								["a", "b", "c", "d", "e"].map((slot) => (
									<TableRow
										key={`skeleton-${slot}`}
										className="border-white/5 hover:bg-transparent"
									>
										<TableCell>
											<div className="flex items-center gap-3">
												<Skeleton className="size-9 rounded-lg bg-zinc-800" />
												<div className="space-y-1.5">
													<Skeleton className="h-3.5 w-32 bg-zinc-800" />
													<Skeleton className="h-3 w-16 bg-zinc-800" />
												</div>
											</div>
										</TableCell>
										<TableCell>
											<Skeleton className="h-3.5 w-40 bg-zinc-800" />
										</TableCell>
										<TableCell>
											<Skeleton className="ml-auto h-8 w-8 rounded-lg bg-zinc-800" />
										</TableCell>
									</TableRow>
								))}

							{!isLoading && filteredCategories.length === 0 && (
								<TableRow className="border-white/5 hover:bg-transparent">
									<TableCell
										colSpan={3}
										className="py-10 text-center text-zinc-500"
									>
										{query
											? "No categories match your search."
											: "No categories found."}
									</TableCell>
								</TableRow>
							)}

							{!isLoading &&
								filteredCategories.map((category) => {
									const slug =
										category.name
											?.toLowerCase()
											.trim()
											.replace(/[^a-z0-9]+/g, "-")
											.replace(/(^-|-$)/g, "") ?? "";

									return (
										<TableRow
											key={category.id ?? category.name}
											className="border-white/5 transition-colors hover:bg-white/[0.02]"
										>
											<TableCell>
												<div className="flex items-center gap-3">
													<span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-indigo-300 ring-1 ring-indigo-400/30">
														<Boxes className="size-4" />
													</span>
													<div className="space-y-0.5">
														<p className="font-medium text-zinc-100">
															{category.name}
														</p>
														<p className="text-xs text-zinc-500">
															CAT-{category.id ?? "N/A"}
														</p>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<span className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400">
													<Hash className="size-3 text-zinc-500" />
													{slug || "—"}
												</span>
											</TableCell>
											<TableCell>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white"
															aria-label="Open actions"
														>
															<MoreHorizontal className="size-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent
														align="end"
														className="w-40 border-white/10 bg-zinc-900/95 text-zinc-200 backdrop-blur-xl"
													>
														<DropdownMenuItem
															onSelect={() =>
																navigate({
																	to: "/admin/categories/edit/$categoryId",
																	params: {
																		categoryId: String(category.id ?? ""),
																	},
																})
															}
															disabled={!category.id}
															className="cursor-pointer focus:bg-white/5 focus:text-white"
														>
															<Pencil className="mr-2 size-3.5" />
															Edit
														</DropdownMenuItem>
														<DropdownMenuSeparator className="bg-white/5" />
														<DropdownMenuItem
															variant="destructive"
															onSelect={() => setCategoryToDelete(category)}
															disabled={!category.id}
															className="cursor-pointer text-rose-300 focus:bg-rose-500/10 focus:text-rose-200"
														>
															<Trash2 className="mr-2 size-3.5" />
															Delete
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</div>
			</div>

			<AlertDialog
				open={categoryToDelete !== null}
				onOpenChange={(open) => !open && setCategoryToDelete(null)}
			>
				<AlertDialogContent
					size="sm"
					className="border-white/10 bg-zinc-900/95 text-zinc-100 ring-1 ring-white/5 backdrop-blur-xl"
				>
					<AlertDialogHeader>
						<AlertDialogMedia className="bg-rose-500/10 text-rose-300 ring-1 ring-rose-400/30">
							<Trash2 className="size-7" />
						</AlertDialogMedia>
						<AlertDialogTitle className="text-white">
							Delete category?
						</AlertDialogTitle>
						<AlertDialogDescription className="text-zinc-400">
							This will permanently remove{" "}
							<span className="font-medium text-zinc-200">
								{categoryToDelete?.name ?? "this category"}
							</span>
							. Products in this category may become uncategorised. This action
							cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel
							disabled={isDeleting}
							className="border-white/10 bg-white/5 text-zinc-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
						>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							disabled={isDeleting}
							onClick={(event) => {
								event.preventDefault();
								handleConfirmDelete();
							}}
							className="bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-[0_8px_24px_rgba(244,63,94,0.35)] hover:from-rose-400 hover:to-rose-500"
						>
							{isDeleting ? (
								<>
									<Loader className="mr-2 size-4 animate-spin" />
									Deleting...
								</>
							) : (
								"Delete category"
							)}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
