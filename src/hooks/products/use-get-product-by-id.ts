import { useQuery } from "@tanstack/react-query";
import { getProductOptions } from "@/generated/@tanstack/react-query.gen.ts";

export const useGetProductById = (id: number) => {
	return useQuery(
		getProductOptions({
			path: {
				id,
			},
		}),
	);
};
