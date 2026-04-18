import { getProductsByCategoryOptions } from "@/generated/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";

export const useGetProductsByCategoryId = (categoryId: number, pageNumber: number, pageSize: number ) => {
	
	return useQuery(
		getProductsByCategoryOptions({
			path: {
				categoryId: categoryId
			},
			query: {
				pageNumber: pageNumber,
				pageSize: pageSize, 
				
			}, 
			
		}),
	);
};
