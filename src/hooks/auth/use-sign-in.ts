import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import * as z from "zod";
import type { LoginResponseDto } from "@/generated";
import { signInMutation } from "@/generated/@tanstack/react-query.gen";
import { useAuth } from "@/lib/auth-store.ts";

z.object({
	username: z.email("Invalid email address"),
	password: z.string().min(4, "Password must be at least 4 characters"),
});
// export function useSignIn() {
// 	return useMutation({
// 		mutationFn: signIn,
// 		onSuccess: (data) => {
// 			toast.success("User Signed in Successfully");
// 			console.log(data);
// 		},
// 		onError: (error) => {
// 			console.error(`Error while Signing in | Error '${error.message}' ` );
// 		toast.error(`Error while Signing in   | Error '${error.message}' ` );
// 		}
// 	});
// }

export function useSignIn() {
	const navigate = useNavigate();
	// const queryClient = useQueryClient();
	const { login } = useAuth();
	return useMutation({
		...signInMutation(),
		onSuccess: (data: LoginResponseDto) => {
			toast.success("User Signed in Successfully");

			login(data);
			// queryClient.invalidateQueries({ queryKey: getCurrentUserDetailsQueryKey()})
			console.log(data);
			navigate({
				to: "/",
			});
		},
		onError: (error: Error) => {
			console.error(`Error while Signing in | Error '${error.message}' `);
			toast.error(`Error while Signing in   | Error '${error.message}' `);
		},
	});
}
