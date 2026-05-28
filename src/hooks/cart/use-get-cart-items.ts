import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { CartDto } from "@/generated";
import { getCarByIdOptions } from "@/generated/@tanstack/react-query.gen.ts";
import { useCartStore } from "@/lib/cart-store";

export type TCartProductItem = {
	productId: number;
	name: string;
	description: string;
	price: number;
	discount: number;
	imageUrl: string;
	quantity: number;
	baseAmount: number;
	discountAmount: number;
};

export function mapCartToItems(cart: CartDto | undefined): TCartProductItem[] {
	if (!cart?.products) return [];

	return cart.products
		.filter(
			(
				p,
			): p is Required<Pick<NonNullable<typeof p>, "productId" | "price">> &
				typeof p => p.productId != null && p.price != null,
		)
		.map((p) => {
			const qty = p.quantity ?? 1;
			const price = p.price;
			const discountPct = p.discount ?? 0;
			return {
				productId: p.productId,
				name: p.name ?? "",
				description: p.description ?? "",
				price,
				discount: discountPct,
				imageUrl: p.imageUrl ?? "",
				quantity: qty,
				baseAmount: price * qty,
				discountAmount: price * (discountPct / 100) * qty,
			};
		});
}

function mapCartToStoreItems(cart: CartDto | undefined) {
	if (!cart?.products) return [];

	return cart.products
		.filter(
			(
				product,
			): product is Required<Pick<NonNullable<typeof product>, "productId">> &
				typeof product => product.productId != null,
		)
		.map((product) => ({
			productId: product.productId,
			quantity: Math.max(product.quantity ?? 1, 1),
		}));
}

export const useGetCartItems = () => {
	const query = useQuery(getCarByIdOptions());
	const hydrateItems = useCartStore((state) => state.hydrateItems);

	useEffect(() => {
		if (query.data) {
			hydrateItems(mapCartToStoreItems(query.data));
		}
	}, [query.data, hydrateItems]);

	return query;
};
