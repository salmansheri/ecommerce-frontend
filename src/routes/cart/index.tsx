import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Minus,
	Plus,
	ShieldCheck,
	ShoppingBag,
	Trash2,
	Truck,
} from "lucide-react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useCreateCart } from "@/hooks/cart/use-create-cart";
import {
	mapCartToItems,
	useGetCartItems,
} from "@/hooks/cart/use-get-cart-items";
import { useRemoveCartItem } from "@/hooks/cart/use-remove-cart-item";
import { useGetProducts } from "@/hooks/products/use-get-products";
import {
	addToCart,
	removeFromCart,
	setCartItemQuantity,
	useCartStore,
} from "@/lib/cart-store";
import { formatNumberToCurrency } from "@/lib/utils";

export const Route = createFileRoute("/cart/")({
	component: CartPage,
});

function CartPage() {
	const { data: cart } = useGetCartItems();
	const { data: productsResponse } = useGetProducts(0, 20, "", "");
	const cartItems = useCartStore((state) => state.items);
	const cartProducts = mapCartToItems(cart);
	const recommendedProducts = useMemo(() => {
		const allProducts = productsResponse?.data ?? [];
		const cartProductIds = new Set(cartProducts.map((item) => item.productId));
		return allProducts
			.filter((product) => !cartProductIds.has(product.productId ?? -1))
			.slice(0, 4);
	}, [productsResponse?.data, cartProducts]);
	const { mutate: createCart } = useCreateCart();
	const { mutate: removeCartItem } = useRemoveCartItem();

	const pricing = useMemo(() => {
		const subtotal = cartProducts.reduce(
			(total, item) => total + item.baseAmount,
			0,
		);
		const discount = cartProducts.reduce(
			(total, item) => total + item.discountAmount,
			0,
		);
		const netAmount = subtotal - discount;
		const shipping = netAmount <= 0 ? 0 : netAmount >= 2500 ? 0 : 99;
		const tax = (subtotal - discount) * 0.05;
		const total = subtotal - discount + tax + shipping;

		return { subtotal, discount, shipping, tax, total };
	}, [cartProducts]);

	const increaseQuantity = (productId: number) => {
		addToCart(productId, 1);
		createCart({ path: { productId, quantity: 1 } });
	};

	const decreaseQuantity = (productId: number) => {
		const activeItem = cartItems.find((item) => item.productId === productId);

		if (!activeItem) {
			return;
		}

		setCartItemQuantity(productId, activeItem.quantity - 1);
	};

	const removeItem = (productId: number) => {
		const cartId = cart?.cartId;
		if (!cartId) {
			removeFromCart(productId);
			return;
		}

		removeCartItem({
			path: {
				cartId,
				productId,
			},
		});
	};

	return (
		<section className="relative isolate min-h-[calc(100dvh-8rem)] overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl" />
				<div className="absolute -left-12 bottom-0 h-72 w-72 rounded-full bg-cyan-300/15 blur-3xl" />
			</div>

			<div className="mx-auto max-w-7xl">
				<div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8">
					<div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
								Cart
							</p>
							<h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
								Your shopping bag
							</h1>
							<p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
								Review your selected products, adjust quantities, and proceed to
								checkout when you are ready.
							</p>
						</div>
						<div className="inline-flex items-center gap-2 self-start rounded-full border border-border/70 bg-background/70 px-3 py-2 text-xs text-muted-foreground">
							<span className="inline-flex size-2 rounded-full bg-emerald-500" />
							Secure payment and insured shipping
						</div>
					</div>
				</div>

				<div className="mt-8 grid gap-6 xl:grid-cols-[1fr_360px]">
					<div className="space-y-4">
						{cartProducts.length === 0 ? (
							<div className="rounded-3xl border border-dashed border-border/70 bg-card p-10 text-center">
								<div className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
									<ShoppingBag className="size-5" />
								</div>
								<h2 className="mt-4 text-xl font-semibold">
									Your cart is empty
								</h2>
								<p className="mt-2 text-sm text-muted-foreground">
									Add a few products and they will appear here.
								</p>
								<Button asChild className="mt-5 rounded-full px-5">
									<Link to="/product">Continue shopping</Link>
								</Button>
							</div>
						) : (
							cartProducts.map((item) => (
								<article
									key={item.productId}
									className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5"
								>
									<div className="flex flex-col gap-4 sm:flex-row sm:items-start">
										<img
											src={item.imageUrl}
											alt={item.name}
											className="h-28 w-full rounded-xl border border-border/70 object-cover sm:w-36"
										/>

										<div className="flex-1">
											<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
												<div>
													<Link
														to="/product/$productId"
														params={{
															productId: item.productId.toString(),
														}}
														className="text-base font-semibold tracking-tight hover:underline"
													>
														{item.name}
													</Link>
													<p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
														{item.description}
													</p>
												</div>
												<div className="text-right">
													<p className="text-sm text-muted-foreground">
														Item total
													</p>
													<p className="text-base font-semibold">
														{formatNumberToCurrency(
															item.baseAmount - item.discountAmount,
														)}
													</p>
												</div>
											</div>

											<div className="mt-4 flex flex-wrap items-center justify-between gap-3">
												<div className="inline-flex items-center rounded-full border border-border/70 bg-background/70 p-1">
													<Button
														variant="ghost"
														size="icon-sm"
														onClick={() => decreaseQuantity(item.productId)}
														aria-label="Decrease quantity"
													>
														<Minus className="size-3.5" />
													</Button>
													<span className="min-w-8 px-2 text-center text-sm font-medium">
														{item.quantity}
													</span>
													<Button
														variant="ghost"
														size="icon-sm"
														onClick={() => increaseQuantity(item.productId)}
														aria-label="Increase quantity"
													>
														<Plus className="size-3.5" />
													</Button>
												</div>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => removeItem(item.productId)}
													className="text-muted-foreground hover:text-destructive"
												>
													<Trash2 className="size-4" />
													Remove
												</Button>
											</div>
										</div>
									</div>
								</article>
							))
						)}

						{cartProducts.length > 0 && (
							<div className="rounded-2xl border border-border/70 bg-card p-5">
								<h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
									You might also like
								</h3>
								<div className="mt-4 grid gap-3 sm:grid-cols-2">
									{recommendedProducts.map((product) => (
										<Link
											key={product.productId}
											to="/product/$productId"
											params={{
												productId: product.productId?.toString() ?? "0",
											}}
											className="rounded-xl border border-border/70 bg-background/70 p-3 transition-colors hover:bg-accent"
										>
											<p className="line-clamp-1 text-sm font-medium">
												{product.name}
											</p>
											<p className="mt-1 text-xs text-muted-foreground">
												{formatNumberToCurrency(product.price ?? 0)}
											</p>
										</Link>
									))}
								</div>
							</div>
						)}
					</div>

					<aside className="h-fit rounded-2xl border border-border/70 bg-card p-5 shadow-sm xl:sticky xl:top-28">
						<h2 className="text-lg font-semibold tracking-tight">
							Order summary
						</h2>
						<div className="mt-4 space-y-3 text-sm">
							<div className="flex items-center justify-between text-muted-foreground">
								<span>Subtotal</span>
								<span>{formatNumberToCurrency(pricing.subtotal)}</span>
							</div>
							<div className="flex items-center justify-between text-muted-foreground">
								<span>Discount</span>
								<span>-{formatNumberToCurrency(pricing.discount)}</span>
							</div>
							<div className="flex items-center justify-between text-muted-foreground">
								<span>Shipping</span>
								<span>
									{pricing.shipping === 0
										? "Free"
										: formatNumberToCurrency(pricing.shipping)}
								</span>
							</div>
							<div className="flex items-center justify-between text-muted-foreground">
								<span>Tax (5%)</span>
								<span>{formatNumberToCurrency(pricing.tax)}</span>
							</div>
						</div>
						<div className="my-4 h-px bg-border" />
						<div className="flex items-center justify-between text-base font-semibold">
							<span>Total</span>
							<span>{formatNumberToCurrency(pricing.total)}</span>
						</div>
						<Button className="mt-5 h-10 w-full rounded-full bg-foreground text-background hover:bg-foreground/90">
							Proceed to checkout
						</Button>
						<div className="mt-5 space-y-2 rounded-xl border border-border/70 bg-background/70 p-3 text-xs text-muted-foreground">
							<p className="inline-flex items-center gap-2">
								<ShieldCheck className="size-3.5" />
								256-bit encrypted payment security
							</p>
							<p className="inline-flex items-center gap-2">
								<Truck className="size-3.5" />
								Orders dispatch within 24 hours
							</p>
						</div>
					</aside>
				</div>
			</div>
		</section>
	);
}
