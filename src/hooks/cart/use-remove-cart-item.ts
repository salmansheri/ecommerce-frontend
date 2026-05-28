import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
	deleteProductFromCartMutation,
	getCarByIdQueryKey,
} from "@/generated/@tanstack/react-query.gen";
import { removeFromCart } from "@/lib/cart-store";

export const useRemoveCartItem = () => {
	const queryClient = useQueryClient();

	return useMutation({
		...deleteProductFromCartMutation(),
		onSuccess: (_, variables) => {
			removeFromCart(variables.path.productId);
			queryClient.invalidateQueries({ queryKey: getCarByIdQueryKey() });
		},
		onError: (error: Error) => {
			toast.error(`Error removing from cart | Error '${error.message}'`);
		},
	});
};
