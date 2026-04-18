import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
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
import { setAuthUser } from "@/lib/auth-store";

const formSchema = z.object({
	username: z.string().min(4, "username must be atleast 4 characters"),
	password: z.string().min(4, "Password must be atleast 4 characters"),
});

export function SignInForm({ ...props }: React.ComponentProps<typeof Card>) {
	const { mutate, isPending } = useSignIn();

	const form = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
		validators: {
			onSubmit: formSchema,
			onChange: formSchema,
		},
		onSubmit: async ({ value }) => {
			mutate({
				body: {
					username: value.username,
					password: value.password
				}
			});

			
		},
	});

	return (
		<Card
			className="w-full max-w-md border-border/70 bg-card/95 shadow-xl backdrop-blur"
			{...props}
		>
			<CardHeader className="text-center">
				<div className="mx-auto mb-2 inline-flex rounded-full border border-border/70 bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
					Welcome back
				</div>
				<CardTitle className="text-2xl tracking-tight">
					Sign in to ShopVerse
				</CardTitle>
				<CardDescription>
					Access your orders, wishlist, and personalized deals.
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
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Username</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="johnsmith"
											className="h-10 bg-background/70"
										/>
										<FieldDescription>
											Use your registered username to continue.
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
								type="submit"
								disabled={isPending}
								className="h-10 w-full bg-foreground text-background hover:bg-foreground/90"
							>
								{isPending ? "Signing in..." : "Sign In"}
							</Button>
						</Field>
						<FieldDescription className="text-center">
							New here?{" "}
							<Link
								to="/auth/sign-up"
								className="font-medium underline underline-offset-4 hover:text-primary"
							>
								Create your account
							</Link>
						</FieldDescription>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
