import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data/product";
import { formatNumberToCurrency, formatNumberToPercentage } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: App });

const trendingProducts = products.slice(0, 4);
const spotlightProducts = products.slice(6, 9);

function App() {
	return (
		<section className="relative isolate overflow-hidden px-4 pb-14 pt-8 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute left-1/2 top-[-120px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl" />
				<div className="absolute -left-20 top-1/3 h-[300px] w-[300px] rounded-full bg-cyan-300/10 blur-3xl" />
			</div>

			<div className="mx-auto max-w-7xl">
				<div className="grid items-center gap-8 rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10">
					<div>
						<div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
							<Sparkles className="size-3.5" />
							Season Launch Collection
						</div>
						<h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
							Elevate your everyday tech and lifestyle essentials.
						</h1>
						<p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
							Discover premium accessories, gadgets, and home upgrades curated
							for comfort, performance, and style.
						</p>

						<div className="mt-6 flex flex-col gap-3 sm:flex-row">
							<Button asChild size="lg" className="rounded-full px-6">
								<Link to="/product">
									Shop now
									<ArrowRight className="size-4" />
								</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								size="lg"
								className="rounded-full px-6"
							>
								<Link to="/cart">View cart</Link>
							</Button>
						</div>

						<div className="mt-6 grid gap-3 sm:grid-cols-3">
							<div className="rounded-xl border border-border/70 bg-background/70 p-3">
								<Truck className="mb-2 size-4 text-emerald-600" />
								<p className="text-sm font-semibold">Fast shipping</p>
								<p className="text-xs text-muted-foreground">Across India</p>
							</div>
							<div className="rounded-xl border border-border/70 bg-background/70 p-3">
								<ShieldCheck className="mb-2 size-4 text-sky-600" />
								<p className="text-sm font-semibold">Secure checkout</p>
								<p className="text-xs text-muted-foreground">
									Trusted payments
								</p>
							</div>
							<div className="rounded-xl border border-border/70 bg-background/70 p-3">
								<Sparkles className="mb-2 size-4 text-amber-600" />
								<p className="text-sm font-semibold">Curated picks</p>
								<p className="text-xs text-muted-foreground">
									Top rated products
								</p>
							</div>
						</div>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						{trendingProducts.map((product) => (
							<Link
								key={product.productId}
								to="/product/$productId"
								params={{ productId: product.productId.toString() }}
								className="group rounded-2xl border border-border/70 bg-background/70 p-4 transition-all hover:-translate-y-0.5 hover:bg-accent"
							>
								<img
									src={product.imageUrl}
									alt={product.name}
									className="h-28 w-full rounded-lg border border-border/70 object-cover"
								/>
								<p className="mt-3 line-clamp-1 text-sm font-medium">
									{product.name}
								</p>
								<div className="mt-2 flex items-center justify-between">
									<span className="text-sm font-semibold">
										{formatNumberToCurrency(product.price)}
									</span>
									<span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
										{formatNumberToPercentage(product.discount)} Off
									</span>
								</div>
							</Link>
						))}
					</div>
				</div>

				<div className="mt-8 rounded-3xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
					<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
								Spotlight
							</p>
							<h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
								Popular right now
							</h2>
						</div>
						<Button asChild variant="link" className="h-auto p-0 text-sm">
							<Link to="/product">See all products</Link>
						</Button>
					</div>

					<div className="mt-5 grid gap-4 md:grid-cols-3">
						{spotlightProducts.map((product) => (
							<Link
								key={product.productId}
								to="/product/$productId"
								params={{ productId: product.productId.toString() }}
								className="rounded-2xl border border-border/70 bg-background/70 p-4 transition-colors hover:bg-accent"
							>
								<p className="line-clamp-1 text-base font-medium">
									{product.name}
								</p>
								<p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
									{product.description}
								</p>
								<p className="mt-3 text-sm font-semibold">
									{formatNumberToCurrency(product.price)}
								</p>
							</Link>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
