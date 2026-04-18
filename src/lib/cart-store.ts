import { Derived, Store } from "@tanstack/store";
import { products } from "@/lib/data/product";

export type TCartItem = {
	productId: number;
	quantity: number;
};

const MAX_CART_QUANTITY = 10;

const initialCartItems: TCartItem[] = products
	.filter((product) => product.quantity > 0)
	.slice(1, 5)
	.map((product, index) => ({
		productId: product.productId,
		quantity: index === 0 ? 1 : 2,
	}));

export const cartStore = new Store<{ items: TCartItem[] }>({
	items: initialCartItems,
});

export const cartItemCountStore = new Derived({
	deps: [cartStore],
	fn: () =>
		cartStore.state.items.reduce((total, item) => total + item.quantity, 0),
});

export function addToCart(productId: number, quantity = 1) {
	if (quantity <= 0) {
		return;
	}

	cartStore.setState((state) => {
		const existingItem = state.items.find(
			(item) => item.productId === productId,
		);

		if (!existingItem) {
			return {
				...state,
				items: [
					...state.items,
					{ productId, quantity: Math.min(quantity, MAX_CART_QUANTITY) },
				],
			};
		}

		return {
			...state,
			items: state.items.map((item) =>
				item.productId === productId
					? {
							...item,
							quantity: Math.min(item.quantity + quantity, MAX_CART_QUANTITY),
						}
					: item,
			),
		};
	});
}

export function setCartItemQuantity(productId: number, quantity: number) {
	cartStore.setState((state) => ({
		...state,
		items: state.items
			.map((item) =>
				item.productId === productId
					? {
							...item,
							quantity: Math.min(Math.max(quantity, 0), MAX_CART_QUANTITY),
						}
					: item,
			)
			.filter((item) => item.quantity > 0),
	}));
}

export function removeFromCart(productId: number) {
	cartStore.setState((state) => ({
		...state,
		items: state.items.filter((item) => item.productId !== productId),
	}));
}
