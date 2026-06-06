import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { createProductMutation } from "@/generated/@tanstack/react-query.gen";

export function useCreateProduct() {
	const navigate = useNavigate();

	return useMutation({
		...createProductMutation(),
		onError: (error) => {
			console.error(error);
			toast.error(`Failed to create product: ${error.message}`);
		},
		onSuccess: (data) => {
			console.log("Created product:", data);
			toast.success("Product created successfully");
			navigate({ to: "/admin/products" });
		},
	});
}
