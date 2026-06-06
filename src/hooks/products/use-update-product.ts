import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
	getProductsQueryKey,
	updateProductMutation,
} from "@/generated/@tanstack/react-query.gen";

export function useUpdateProduct() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		...updateProductMutation(),
		onError: (error) => {
			console.error(error);
			toast.error(`Failed to update product: ${error.message}`);
		},
		onSuccess: (data) => {
			console.log("Updated product:", data);
			toast.success("Product updated successfully");
			queryClient.invalidateQueries({ queryKey: getProductsQueryKey() });
			navigate({ to: "/admin/products" });
		},
	});
}
