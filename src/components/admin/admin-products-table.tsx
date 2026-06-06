import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { ProductDto } from "@/generated";
import { formatNumberToCurrency } from "@/lib/utils";

interface AdminProductsTableProps {
	products: ProductDto[];
	isLoading?: boolean;
}

function getStatus(quantity: number) {
	if (quantity > 20) {
		return "Active";
	}

	if (quantity > 0) {
		return "Low Stock";
	}

	return "Out of Stock";
}

function statusClass(status: ReturnType<typeof getStatus>) {
	if (status === "Active") {
		return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300";
	}

	if (status === "Low Stock") {
		return "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300";
	}

	return "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300";
}

export function AdminProductsTable({
	products,
	isLoading = false,
}: AdminProductsTableProps) {
	return (
		<div className="overflow-hidden rounded-xl border border-zinc-200/70 bg-white/90 shadow-sm sm:rounded-2xl dark:border-zinc-800 dark:bg-zinc-900/80">
			<div className="flex flex-col gap-3 border-b border-zinc-200/70 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
				<div>
					<h2 className="text-base font-semibold tracking-tight sm:text-lg">
						Product Catalog
					</h2>
					<p className="text-xs text-zinc-500 sm:text-sm">
						Manage inventory, pricing, and product visibility.
					</p>
				</div>
				<Button className="rounded-xl">Add Product</Button>
			</div>

			<div className="p-2 sm:p-4">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Product</TableHead>
							<TableHead className="text-right">Discount</TableHead>
							<TableHead className="text-right">Stock</TableHead>
							<TableHead className="text-right">Price</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="w-12" />
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading && (
							<TableRow>
								<TableCell
									colSpan={6}
									className="py-8 text-center text-zinc-500"
								>
									Loading products...
								</TableCell>
							</TableRow>
						)}

						{!isLoading && products.length === 0 && (
							<TableRow>
								<TableCell
									colSpan={6}
									className="py-8 text-center text-zinc-500"
								>
									No products found.
								</TableCell>
							</TableRow>
						)}

						{!isLoading &&
							products.map((product) => {
								const quantity = product.quantity ?? 0;
								const status = getStatus(quantity);

								return (
									<TableRow key={product.productId ?? product.name}>
										<TableCell>
											<div className="space-y-0.5">
												<p className="font-medium">{product.name}</p>
												<p className="text-xs text-zinc-500">
													PRD-{product.productId ?? "N/A"}
												</p>
											</div>
										</TableCell>
										<TableCell className="text-right">
											{product.discount ?? 0}%
										</TableCell>
										<TableCell className="text-right">{quantity}</TableCell>
										<TableCell className="text-right font-medium">
											{formatNumberToCurrency(product.price ?? 0)}
										</TableCell>
										<TableCell>
											<span
												className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusClass(status)}`}
											>
												{status}
											</span>
										</TableCell>
										<TableCell>
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8 rounded-lg"
											>
												<MoreHorizontal className="size-4" />
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
