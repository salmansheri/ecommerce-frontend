import { useForm } from "@tanstack/react-form";
import { Loader } from "lucide-react";
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
import { type RegisterUserInput, useRegisterUser } from "@/hooks/auth/use-register-user";
import { PasswordInput } from "./password-input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

// {
//     "username":"user3",
//     "email":"user3email@gmail.com",
//     "password":"password3",
//     "role":["user"]
// }



const formSchema = z.object({
	username: z.string().min(5, "user name must be atleast 5 characters"),
	email: z.email(),
	password: z.string().min(4, "Password must be atleast 4 characters"),

});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
	const id = useId();

	const {mutate, isPending } = useRegisterUser(); 

	const form = useForm({
		defaultValues: {
			username: "",
			email: "",
			password: "",
			
		},
		validators: {
			onSubmit: formSchema,
			onChange: formSchema,
			
		},
		onSubmit: async ({value}) => {
			mutate(value);
		},
	});

	return (
		<Card className="w-full max-w-md my-5" {...props}>
			<CardHeader className="text-center">
				<CardTitle className="text-2xl">Create an account</CardTitle>
				<CardDescription>
					Enter your information below to create your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					id={`${id}-signup-form`}
					onSubmit={(event) => {
						event.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.Field name="username">
							{(field) => {
								const isInValid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInValid}>
										<FieldLabel htmlFor={field.name}>Username</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInValid}
											type="text"
											placeholder="John Doe"
											required
										/>
										{isInValid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<form.Field name="email">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Email</FieldLabel>
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
							<Button disabled={isPending} type="submit" className="w-full inline-flex">
								{isPending ? (
									<>
									<Loader className="animate-spin mr-2" />
									Loading...
									</>
									
								): "Create Account"}
								
							</Button>
						</Field>
						<FieldDescription className="text-center">
							Already have an account?{" "}
							<a
								href="/auth/sign-in"
								className="underline underline-offset-4 hover:text-primary"
							>
								Sign in
							</a>
						</FieldDescription>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
