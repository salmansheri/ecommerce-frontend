import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
	deleteCategoryMutation,
	getAllCategoriesQueryKey,
} from "@/generated/@tanstack/react-query.gen";

export function useDeleteCategory() {
	const queryClient = useQueryClient();

	return useMutation({
		...deleteCategoryMutation(),
		onError: (error) => {
			console.error(error);
			toast.error(`Failed to delete category: ${error.message}`);
		},
		onSuccess: () => {
			toast.success("Category deleted successfully");
			queryClient.invalidateQueries({ queryKey: getAllCategoriesQueryKey() });
		},
	});
}
