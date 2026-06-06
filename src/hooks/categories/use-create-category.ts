import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
	createCategoryMutation,
	getAllCategoriesQueryKey,
} from "@/generated/@tanstack/react-query.gen";

export function useCreateCategory() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		...createCategoryMutation(),
		onError: (error) => {
			console.error(error);
			toast.error(`Failed to create category: ${error.message}`);
		},
		onSuccess: (data) => {
			console.log("Created category:", data);
			toast.success("Category created successfully");
			queryClient.invalidateQueries({ queryKey: getAllCategoriesQueryKey() });
			navigate({ to: "/admin/categories" });
		},
	});
}
