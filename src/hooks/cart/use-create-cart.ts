import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCartMutation, getCarByIdQueryKey } from "@/generated/@tanstack/react-query.gen";

export const useCreateCart = () => {
	const queryClient = useQueryClient();

	return useMutation({
		...createCartMutation(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: getCarByIdQueryKey() });
		},
		onError: (error: Error) => {
			console.error(`Error adding to cart | Error '${error.message}'`);
			toast.error(`Error adding to cart | Error '${error.message}'`);
		},
	});
};
