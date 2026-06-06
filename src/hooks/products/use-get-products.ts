import { useQuery } from "@tanstack/react-query";
import { getProductsOptions } from "@/generated/@tanstack/react-query.gen.ts";

export const useGetProducts = (
	pageNumber: number,
	pageSize: number,
	sortBy: string,
	sortOrder: string,
	keyword?: string,
	category?: string,
) => {
	return useQuery(
		getProductsOptions({
			query: {
				keyword,
				category,
				pageNumber,
				pageSize,
				sortBy,
				sortOrder,
			},
		}),
	);
};
