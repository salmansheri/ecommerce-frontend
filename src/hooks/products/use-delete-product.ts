import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
	deleteProductMutation,
	getProductsQueryKey,
} from "@/generated/@tanstack/react-query.gen";

export function useDeleteProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		...deleteProductMutation(),
		onError: (error) => {
			console.error(error);
			toast.error(`Failed to delete product: ${error.message}`);
		},
		onSuccess: () => {
			toast.success("Product deleted successfully");
			queryClient.invalidateQueries({ queryKey: getProductsQueryKey() });
		},
	});
}
