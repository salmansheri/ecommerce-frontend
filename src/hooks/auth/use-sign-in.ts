import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as z from "zod";
import { API_URL } from "@/lib/utils";
import { getCurrentUserDetailsQueryKey, signInMutation } from "@/generated/@tanstack/react-query.gen";
import { LoginResponseDto } from "@/generated";
import { setAuthUser } from "@/lib/auth-store";
import { useNavigate } from "@tanstack/react-router";


const UserRole = ["user", "seller"] as const;

export type TUserRole = (typeof UserRole)[number];

export const signInSchema = z.object({
	
	username: z.email("Invalid email address"),
	password: z.string().min(4, "Password must be at least 4 characters"),
	
});

export type SignInInput = z.infer<typeof signInSchema>;


  
export interface SignInResponse {
	id: number; 
    jwtCookie: any; 
    username: string;
    roles: Array<string>
	
}



async function signIn(
	input: SignInInput,
): Promise<SignInResponse> {

	const response = await fetch(`${API_URL}/auth/sign-in`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(input),
	});

	if (!response.ok) {
		const error = await response
			.json()
			.catch(() => ({ message: "Registration failed" }));
		throw new Error(error.message);
		
	}

	return response.json();
}

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
	const queryClient = useQueryClient(); 
	return useMutation({
		...signInMutation(),
		onSuccess: (data: LoginResponseDto) => {
			toast.success("User Signed in Successfully");

			setAuthUser({
				id: data?.id,
				roles: data?.roles,
				username: data?.username
			}); 
			queryClient.invalidateQueries({ queryKey: getCurrentUserDetailsQueryKey()}) 
			console.log(data); 
			navigate({
				to: "/"
			})
		},
		onError: (error: any) => {
			console.error(`Error while Signing in | Error '${error.message}' ` ); 
		toast.error(`Error while Signing in   | Error '${error.message}' ` ); 
		}
	});
}
