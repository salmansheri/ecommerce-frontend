import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
	getAllCategoriesQueryKey,
	updateCategoryMutation,
} from "@/generated/@tanstack/react-query.gen";

export function useUpdateCategory() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		...updateCategoryMutation(),
		onError: (error) => {
			console.error(error);
			toast.error(`Failed to update category: ${error.message}`);
		},
		onSuccess: (data) => {
			console.log("Updated category:", data);
			toast.success("Category updated successfully");
			queryClient.invalidateQueries({ queryKey: getAllCategoriesQueryKey() });
			navigate({ to: "/admin/categories" });
		},
	});
}
