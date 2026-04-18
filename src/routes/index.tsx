import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	ChevronLeft,
	ChevronRight,
	ShieldCheck,
	Sparkles,
	Star,
	Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data/product";
import { formatNumberToCurrency, formatNumberToPercentage } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: App });

const trendingProducts = products.slice(0, 4);
const spotlightProducts = products.slice(6, 9);
const heroSlides = products.slice(3, 8);

function App() {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const interval = window.setInterval(() => {
			setCurrentSlide(
				(previousSlide) => (previousSlide + 1) % heroSlides.length,
			);
		}, 5000);

		return () => window.clearInterval(interval);
	}, []);

	const showPreviousSlide = () => {
		setCurrentSlide((previousSlide) =>
			previousSlide === 0 ? heroSlides.length - 1 : previousSlide - 1,
		);
	};

	const showNextSlide = () => {
		setCurrentSlide((previousSlide) => (previousSlide + 1) % heroSlides.length);
	};

	return (
		<section className="relative isolate overflow-hidden px-4 pb-14 pt-8 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute left-1/2 top-[-120px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-amber-300/30 blur-3xl" />
				<div className="absolute -left-20 top-1/3 h-[340px] w-[340px] rounded-full bg-cyan-300/20 blur-3xl" />
				<div className="absolute -right-24 bottom-0 h-[320px] w-[320px] rounded-full bg-rose-300/20 blur-3xl" />
			</div>

			<div className="mx-auto max-w-7xl">
				<div className="grid items-center gap-8 rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-card/70 p-6 shadow-sm backdrop-blur sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10">
					<div>
						<div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
							<Sparkles className="size-3.5" />
							Fresh Picks 2026
						</div>
						<h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
							Modern essentials for a smarter everyday routine.
						</h1>
						<p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
							Discover curated gadgets, accessories, and work-from-home
							must-haves with premium quality, fast delivery, and limited-time
							deals.
						</p>

						<div className="mt-6 flex flex-col gap-3 sm:flex-row">
							<Button
								asChild
								size="lg"
								className="rounded-full bg-foreground px-6 text-background hover:bg-foreground/90"
							>
								<Link to="/product">
									Shop collection
									<ArrowRight className="size-4" />
								</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								size="lg"
								className="rounded-full px-6"
							>
								<Link to="/cart">Go to cart</Link>
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
								<Star className="mb-2 size-4 text-amber-600" />
								<p className="text-sm font-semibold">Top rated picks</p>
								<p className="text-xs text-muted-foreground">
									Handpicked every week
								</p>
							</div>
						</div>
					</div>

					<div className="rounded-2xl border border-border/70 bg-background/70 p-4">
						<div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/80">
							<div
								className="flex transition-transform duration-500 ease-out"
								style={{ transform: `translateX(-${currentSlide * 100}%)` }}
							>
								{heroSlides.map((product) => (
									<Link
										key={product.productId}
										to="/product/$productId"
										params={{ productId: product.productId.toString() }}
										className="min-w-full p-4 sm:p-5"
									>
										<img
											src={product.imageUrl}
											alt={product.name}
											className="h-48 w-full rounded-xl border border-border/70 object-cover sm:h-56"
										/>
										<p className="mt-4 line-clamp-1 text-base font-semibold">
											{product.name}
										</p>
										<p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
											{product.description}
										</p>
										<div className="mt-3 flex items-center justify-between">
											<span className="text-base font-semibold">
												{formatNumberToCurrency(product.price)}
											</span>
											<span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
												{formatNumberToPercentage(product.discount)} Off
											</span>
										</div>
									</Link>
								))}
							</div>

							<div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/25 to-transparent" />

							<button
								type="button"
								onClick={showPreviousSlide}
								className="absolute left-3 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground transition hover:bg-background"
								aria-label="Previous featured product"
							>
								<ChevronLeft className="size-4" />
							</button>
							<button
								type="button"
								onClick={showNextSlide}
								className="absolute right-3 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground transition hover:bg-background"
								aria-label="Next featured product"
							>
								<ChevronRight className="size-4" />
							</button>
						</div>

						<div className="mt-4 flex items-center justify-between gap-3">
							<div className="flex items-center gap-2">
								{heroSlides.map((product, index) => (
									<button
										type="button"
										key={product.productId}
										onClick={() => setCurrentSlide(index)}
										className={`h-2 rounded-full transition-all ${
											currentSlide === index
												? "w-7 bg-foreground"
												: "w-2 bg-muted"
										}`}
										aria-label={`Go to slide ${index + 1}`}
									/>
								))}
							</div>
							<p className="text-xs font-medium text-muted-foreground">
								Swipe-worthy featured deals
							</p>
						</div>
					</div>
				</div>

				<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{trendingProducts.map((product) => (
						<Link
							key={product.productId}
							to="/product/$productId"
							params={{ productId: product.productId.toString() }}
							className="group rounded-2xl border border-border/70 bg-card/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-md"
						>
							<img
								src={product.imageUrl}
								alt={product.name}
								className="h-32 w-full rounded-lg border border-border/70 object-cover"
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
