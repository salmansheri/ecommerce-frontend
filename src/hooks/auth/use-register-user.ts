import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import * as z from "zod";
import { API_URL } from "@/lib/utils";

const UserRole = ["user", "seller"] as const;

export type TUserRole = (typeof UserRole)[number];

export const registerUserSchema = z.object({
	username: z.string().min(5, "Username must be at least 5 characters"),
	email: z.email("Invalid email address"),
	password: z.string().min(4, "Password must be at least 4 characters")
	
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export interface RegisterUserResponse {
	success: boolean;
	message: string;
}


async function registerUser(
	input: RegisterUserInput,
): Promise<RegisterUserResponse> {
	const response = await fetch(`${API_URL}/auth/sign-up`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
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

export function useRegisterUser() {
	return useMutation({
		mutationFn: registerUser,
		onSuccess: (data) => {
			toast.success("User Registered Successfully");
			console.log(data);
		},
		onError: (error) => {
			console.error(`Error while Registering User | Error '${error.message}' `);
			toast.error(`Error while Registering User | Error '${error.message}' `);
		},
	});
}
