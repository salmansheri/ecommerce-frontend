import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Check,
	ChevronRight,
	RotateCcw,
	Shield,
	ShoppingCart,
	Star,
	Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data/product";
import { formatNumberToCurrency, formatNumberToPercentage } from "@/lib/utils";

export const Route = createFileRoute("/product/$productId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { productId } = Route.useParams();
	const product = products.find((item) => item.productId === Number(productId));

	if (!product) {
		return (
			<section className="px-4 py-16 sm:px-8 lg:px-14">
				<div className="mx-auto max-w-3xl rounded-3xl border bg-card p-8 text-center shadow-sm">
					<p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
						Product not available
					</p>
					<h1 className="mt-3 text-3xl font-bold tracking-tight">
						Product not found
					</h1>
					<p className="mt-3 text-muted-foreground">
						The product you are looking for does not exist or has been removed.
					</p>
					<Button asChild className="mt-6" size="lg">
						<Link to="/product">Browse products</Link>
					</Button>
				</div>
			</section>
		);
	}

	const isAvailable = product.quantity > 0;
	const originalPrice =
		product.discount > 0
			? product.price / (1 - product.discount / 100)
			: product.price;
	const highlights = [
		"Genuine quality checked product",
		"Secure payment with instant confirmation",
		"Fast dispatch and reliable delivery tracking",
	];
	const previewTiles = [1, 2, 3, 4];
	

	return (
		<section className="bg-gradient-to-b from-background to-muted/30 px-4 py-10 sm:px-8 lg:px-14 lg:py-14">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8 flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
					<Link to="/" className="transition-colors hover:text-foreground">
						Home
					</Link>
					<ChevronRight className="size-3" />
					<Link
						to="/product"
						className="transition-colors hover:text-foreground"
					>
						Products
					</Link>
					<ChevronRight className="size-3" />
					<span className="font-medium text-foreground">{product.name}</span>
				</div>

				<div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] xl:gap-12">
					<div className="rounded-3xl border bg-card p-4 shadow-sm md:p-6">
						<div className="group relative aspect-square overflow-hidden rounded-2xl bg-muted/30">
							<img
								src={product.imageUrl}
								alt={product.name}
								className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							/>
						</div>
						<div className="mt-4 grid grid-cols-4 gap-3">
							{previewTiles.map((tile) => (
								<div
									key={`thumb-${tile}`}
									className="aspect-square overflow-hidden rounded-xl border bg-background/70"
								>
									<img
										src={product.imageUrl}
										alt={`${product.name} thumbnail ${tile}`}
										className="h-full w-full object-cover"
									/>
								</div>
							))}
						</div>
					</div>

					<div className="space-y-6">
						<div className="flex flex-wrap items-center gap-3">
							<span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
								{product.discount > 0
									? `${formatNumberToPercentage(product.discount)} Off`
									: "Featured"}
							</span>
							<div className="flex items-center gap-1 text-amber-500">
								<Star className="size-4 fill-current" />
								<span className="text-sm font-semibold text-foreground">
									4.8
								</span>
								<span className="text-sm text-muted-foreground">
									(128 reviews)
								</span>
							</div>
						</div>

						<div>
							<h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
								{product.name}
							</h1>
							<p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
								{product.description}
							</p>
						</div>

						<div className="rounded-2xl border bg-card p-5 shadow-sm">
							<div className="flex flex-wrap items-center gap-3">
								<p className="text-3xl font-bold sm:text-4xl">
									{formatNumberToCurrency(product.price)}
								</p>
								{product.discount > 0 && (
									<>
										<p className="text-lg text-muted-foreground line-through">
											{formatNumberToCurrency(originalPrice)}
										</p>
										<span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
											Save {formatNumberToPercentage(product.discount)}
										</span>
									</>
								)}
							</div>
							<p className="mt-2 text-sm text-muted-foreground">
								{isAvailable
									? `${product.quantity} units in stock`
									: "Currently out of stock"}
							</p>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row">
							<Button
								className="h-11 flex-1 text-base"
								size="lg"
								disabled={!isAvailable}
							>
								<ShoppingCart />
								{isAvailable ? "Add to Cart" : "Stock Out"}
							</Button>
							<Button
								className="h-11 flex-1 text-base"
								size="lg"
								variant="outline"
								disabled={!isAvailable}
							>
								Buy Now
							</Button>
						</div>

						<div className="grid gap-3 sm:grid-cols-3">
							<div className="rounded-xl border bg-background/70 p-4">
								<Truck className="mb-2 size-4 text-emerald-600" />
								<p className="text-sm font-semibold">Free shipping</p>
								<p className="text-xs text-muted-foreground">
									On prepaid orders
								</p>
							</div>
							<div className="rounded-xl border bg-background/70 p-4">
								<Shield className="mb-2 size-4 text-blue-600" />
								<p className="text-sm font-semibold">1-year warranty</p>
								<p className="text-xs text-muted-foreground">
									Official support
								</p>
							</div>
							<div className="rounded-xl border bg-background/70 p-4">
								<RotateCcw className="mb-2 size-4 text-orange-600" />
								<p className="text-sm font-semibold">Easy returns</p>
								<p className="text-xs text-muted-foreground">Within 7 days</p>
							</div>
						</div>

						<div className="space-y-3 rounded-2xl border bg-card p-5">
							<h2 className="text-lg font-semibold">Highlights</h2>
							<ul className="space-y-2 text-sm text-muted-foreground">
								{highlights.map((item) => (
									<li key={item} className="flex items-start gap-2">
										<Check className="mt-0.5 size-4 text-emerald-600" />
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>

						<div className="grid gap-3 sm:grid-cols-3">
							<div className="rounded-xl border bg-background/70 p-4">
								<p className="text-xs uppercase tracking-wide text-muted-foreground">
									SKU
								</p>
								<p className="mt-1 text-sm font-semibold">
									PRD-{product.productId}
								</p>
							</div>
							<div className="rounded-xl border bg-background/70 p-4">
								<p className="text-xs uppercase tracking-wide text-muted-foreground">
									Discount
								</p>
								<p className="mt-1 text-sm font-semibold">
									{formatNumberToPercentage(product.discount)}
								</p>
							</div>
							<div className="rounded-xl border bg-background/70 p-4">
								<p className="text-xs uppercase tracking-wide text-muted-foreground">
									Availability
								</p>
								<p className="mt-1 text-sm font-semibold">
									{isAvailable ? "In stock" : "Out of stock"}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
