import { create } from "zustand";
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

type CartStore = {
	items: TCartItem[];
	addToCart: (productId: number, quantity?: number) => void;
	setCartItemQuantity: (productId: number, quantity: number) => void;
	removeFromCart: (productId: number) => void;
};

export const useCartStore = create<CartStore>()((set) => ({
	items: initialCartItems,
	addToCart: (productId: number, quantity = 1) => {
		if (quantity <= 0) return;

		set((state) => {
			const existingItem = state.items.find(
				(item) => item.productId === productId,
			);

			if (!existingItem) {
				return {
					items: [
						...state.items,
						{ productId, quantity: Math.min(quantity, MAX_CART_QUANTITY) },
					],
				};
			}

			return {
				items: state.items.map((item) =>
					item.productId === productId
						? {
								...item,
								quantity: Math.min(
									item.quantity + quantity,
									MAX_CART_QUANTITY,
								),
							}
						: item,
				),
			};
		});
	},
	setCartItemQuantity: (productId: number, quantity: number) => {
		set((state) => ({
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
	},
	removeFromCart: (productId: number) => {
		set((state) => ({
			items: state.items.filter((item) => item.productId !== productId),
		}));
	},
}));

export function addToCart(productId: number, quantity = 1) {
	useCartStore.getState().addToCart(productId, quantity);
}

export function setCartItemQuantity(productId: number, quantity: number) {
	useCartStore.getState().setCartItemQuantity(productId, quantity);
}

export function removeFromCart(productId: number) {
	useCartStore.getState().removeFromCart(productId);
}
