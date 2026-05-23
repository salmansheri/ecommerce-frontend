import { useQuery } from "@tanstack/react-query";
import type { CartDto } from "@/generated";
import { getCarByIdOptions } from "@/generated/@tanstack/react-query.gen.ts";

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
		.filter((p): p is Required<Pick<NonNullable<typeof p>, "productId" | "price">> & typeof p =>
			p.productId != null && p.price != null,
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

export const useGetCartItems = () => {
	return useQuery(getCarByIdOptions());
};
