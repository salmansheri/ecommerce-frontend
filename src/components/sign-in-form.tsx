
import { useForm } from "@tanstack/react-form";
import { useId } from "react";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,

} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@/hooks/auth/use-sign-in";
import { PasswordInput } from "./password-input";


// {
//     "username":"user3",
//     "email":"user3email@gmail.com",
//     "password":"password3",
//     "role":["user"]
// }

const UserRole = ["user", "seller"] as const;

const formSchema = z.object({
	
	username: z.string().min(4, "username must be atleast 4 characters"),
	password: z.string().min(4, "Password must be atleast 4 characters"),

});

export function SignInForm({ ...props }: React.ComponentProps<typeof Card>) {
    const {mutate, isPending} = useSignIn(); 
	

	const form = useForm({
		defaultValues: {
		
			username: "",
			password: ""
			
		},
		validators: {
			onSubmit: formSchema,
			onChange: formSchema
		},
		onSubmit: async ({ value }) => {
            mutate(value); 
			
		},
	});

	return (
		<Card className="w-full max-w-md mx-auto" {...props}>
			<CardHeader className="text-center">
				<CardTitle className="text-2xl">Create an account</CardTitle>
				<CardDescription>
					Enter your information below to create your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					id={`signup-form`}
					onSubmit={(event) => {
						event.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						

						<form.Field name="username">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field  data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Username</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="Enter your Email"
										/>
										<FieldDescription>
											We&apos;ll use this to contact you. We will not share your
											email with anyone else.
										</FieldDescription>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<form.Field name="password">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Password</FieldLabel>
										<PasswordInput
											id={field.name}
											onBlur={field.handleBlur}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="Enter your Password"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>
						

						<Field className="flex flex-col gap-4 mt-2">
							<Button type="submit" className="w-full">
								Create Account
							</Button>
							
						</Field>
						<FieldDescription className="text-center">
							New?
							<a
								href="/auth/sign-up"
								className="underline underline-offset-4 hover:text-primary"
							>
								Sign Up
							</a>
						</FieldDescription>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
