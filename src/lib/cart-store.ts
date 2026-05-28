import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TCartItem = {
	productId: number;
	quantity: number;
};

const MAX_CART_QUANTITY = 10;

type CartStore = {
	items: TCartItem[];
	hydrateItems: (items: TCartItem[]) => void;
	addToCart: (productId: number, quantity?: number) => void;
	setCartItemQuantity: (productId: number, quantity: number) => void;
	removeFromCart: (productId: number) => void;
};

export const useCartStore = create<CartStore>()(
	persist(
		(set) => ({
			items: [],
			hydrateItems: (items) => {
				set({ items });
			},
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
										quantity: Math.min(
											Math.max(quantity, 0),
											MAX_CART_QUANTITY,
										),
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
		}),
		{
			name: "cart-store",
		},
	),
);

export function addToCart(productId: number, quantity = 1) {
	useCartStore.getState().addToCart(productId, quantity);
}

export function setCartItemQuantity(productId: number, quantity: number) {
	useCartStore.getState().setCartItemQuantity(productId, quantity);
}

export function removeFromCart(productId: number) {
	useCartStore.getState().removeFromCart(productId);
}
