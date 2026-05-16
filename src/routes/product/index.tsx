import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { ArrowDown, ArrowDownUp, ArrowUp, CheckIcon } from "lucide-react";
import z from "zod";
import { CustomSelect } from "@/components/custom-select";
import { LoaderWrapper } from "@/components/loader-wrapper";
import { PaginationUI } from "@/components/paginationUI";
import Products from "@/components/products";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetCategories } from "@/hooks/categories/use-get-categories";
import {useGetProducts} from "@/hooks/products/use-get-products.ts";

const productSearchSchema = z.object({
	page: z.number().default(0),
	category: z.string().default(""),
	sortBy: z.string().default(""),
	sortOrder: z.string().default(""),
	keyword: z.string().default("")
});

export const Route = createFileRoute("/product/")({
	component: Product,
	loader: () => {
		// throw new Error("Some went wrong")
	},
	validateSearch: productSearchSchema,
});

const sortOptions = [
	{ label: "Name (A-Z)", value: "name", order: "asc" },
	{ label: "Name (Z-A)", value: "name", order: "desc" },
	{ label: "Price: Low to High", value: "price", order: "asc" },
	{ label: "Price: High to Low", value: "price", order: "desc" },
	{ label: "Newest First", value: "createdAt", order: "desc" },
	{ label: "Oldest First", value: "createdAt", order: "asc" },
];



function SortButton() {
	const { sortBy, sortOrder } = Route.useSearch();
	const navigate = useNavigate({ from: "/product" });

	const activeOption = sortOptions.find(
		(o) => o.value === sortBy && o.order === sortOrder,
	);

	const SortIcon =
		!sortBy || !sortOrder
			? ArrowDownUp
			: sortOrder === "asc"
				? ArrowUp
				: ArrowDown;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-xl border bg-background/70 px-4 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring/50">
				<SortIcon className="size-4" />
				<span className="hidden sm:inline">
					{activeOption ? activeOption.label : "Sort by"}
				</span>
				<span className="sm:hidden">{activeOption ? "Sorted" : "Sort"}</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-52">
				<DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
					Sort Products
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{sortOptions.map((option) => {
					const isActive =
						activeOption?.value === option.value &&
						activeOption?.order === option.order;
					return (
						<DropdownMenuItem
							key={`${option.value}-${option.order}`}
							className="cursor-pointer"
							onClick={() =>
								navigate({
									search: { sortBy: option.value, sortOrder: option.order },
								})
							}
						>
							<span className="flex-1">{option.label}</span>
							{isActive && <CheckIcon className="size-4 text-primary" />}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function Product() {
	const { page, category, sortOrder, sortBy, keyword } = Route.useSearch();
	console.log("Category: ", category);

	const pageSize = 10;

	const { data: products, isLoading: isProductsLoading } =
		useGetProducts(page, pageSize, sortBy, sortOrder, keyword, category);
	const { data: categories, isLoading: isLoadingCategory } = useGetCategories();

	const categoryList = categories?.data ?? [];

	const productList = products?.data ?? [];
	const totalProducts = productList.length;

	const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));
	const safePage = Math.min(Math.max(1, page), totalPages);
	const startIndex = (safePage - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize, totalProducts);

	const visibleProducts = productList.slice(startIndex, endIndex);

	return (
		<section className="min-h-screen bg-linear-to-b from-background via-background to-muted/30 px-4 py-10 sm:px-8 lg:px-14 lg:py-14">
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
								<p className="text-xl font-bold">{categoryList.length}</p>
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
						<CustomSelect value={category} data={categories?.data} />
						<SortButton />
						{category ? (
							<span className="min-w-27.5 rounded-full border bg-muted px-3 py-1 text-center text-xs font-medium text-muted-foreground">
								Category: {category}
							</span>
						) : (
							<span className="min-w-27.5 rounded-full border bg-muted px-3 py-1 text-center text-xs font-medium text-muted-foreground">
								All categories
							</span>
						)}
					</div>
				</div>

				<div
					className="mt-8 
				rounded-3xl border bg-card p-5 shadow-sm sm:p-6"
				>
					<LoaderWrapper isLoading={isLoadingCategory || isProductsLoading}>
						<div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
							<p className="text-sm text-muted-foreground">
								Showing {startIndex + 1}-{endIndex} of {totalProducts} products
							</p>
							<p className="text-xs uppercase tracking-wide text-muted-foreground">
								Page {safePage} of {totalPages}
							</p>
						</div>
						<Products products={visibleProducts} />
						<div className="mt-8 border-t pt-4">
							<PaginationUI
								pageSize={pageSize}
								page={safePage}
								products={productList}
							/>
						</div>
					</LoaderWrapper>
				</div>
			</div>
		</section>
	);
}
