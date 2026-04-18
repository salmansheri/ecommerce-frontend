import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { useId } from "react";
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
import { useRegisterUser } from "@/hooks/auth/use-register-user";
import { PasswordInput } from "./password-input";

const formSchema = z.object({
	username: z.string().min(5, "user name must be atleast 5 characters"),
	email: z.email(),
	password: z.string().min(4, "Password must be atleast 4 characters"),
});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
	const id = useId();

	const { mutate, isPending } = useRegisterUser();

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
		onSubmit: async ({ value }) => {
			mutate(value);
		},
	});

	return (
		<Card
			className="my-3 w-full max-w-md border-border/70 bg-card/95 shadow-xl backdrop-blur"
			{...props}
		>
			<CardHeader className="text-center">
				<div className="mx-auto mb-2 inline-flex rounded-full border border-border/70 bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
					Get started
				</div>
				<CardTitle className="text-2xl tracking-tight">
					Create your ShopVerse account
				</CardTitle>
				<CardDescription>
					Join in seconds and start shopping smarter.
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
											className="h-10 bg-background/70"
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
											type="email"
											placeholder="Enter your Email"
											className="h-10 bg-background/70"
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
											className="h-10 bg-background/70"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>
						<Field className="mt-2 flex flex-col gap-4">
							<Button
								disabled={isPending}
								type="submit"
								className="inline-flex h-10 w-full bg-foreground text-background hover:bg-foreground/90"
							>
								{isPending ? (
									<>
										<Loader className="mr-2 animate-spin" />
										Creating account...
									</>
								) : (
									"Create Account"
								)}
							</Button>
						</Field>
						<FieldDescription className="text-center">
							Already have an account?{" "}
							<Link
								to="/auth/sign-in"
								className="font-medium underline underline-offset-4 hover:text-primary"
							>
								Sign in
							</Link>
						</FieldDescription>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
