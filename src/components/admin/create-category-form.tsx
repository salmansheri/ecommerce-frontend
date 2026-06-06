import { useForm } from "@tanstack/react-form";
import { Boxes, Loader, Tag } from "lucide-react";
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
import { useCreateCategory } from "@/hooks/categories/use-create-category";

const formSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(60, "Name is too long")
		.refine((value) => value.trim().length > 0, {
			message: "Name cannot be empty",
		}),
});

export function CreateCategoryForm() {
	const id = useId();
	const { mutate, isPending } = useCreateCategory();

	const form = useForm({
		defaultValues: { name: "" },
		validators: {
			onSubmit: formSchema,
			onChange: formSchema,
		},
		onSubmit: async ({ value }) => {
			mutate({ body: { name: value.name.trim() } });
		},
	});

	return (
		<Card className="relative w-full overflow-hidden border-white/10 bg-zinc-900/60 shadow-[0_24px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/5 backdrop-blur-xl">
			<div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl" />
			<div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
			<CardHeader className="relative">
				<div className="flex items-center gap-3">
					<span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-indigo-300 ring-1 ring-indigo-400/30">
						<Boxes className="size-5" />
					</span>
					<div>
						<CardTitle className="text-xl text-white">
							New category details
						</CardTitle>
						<CardDescription className="text-zinc-500">
							Give the category a clear, descriptive name. The slug will be
							generated automatically.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="relative">
				<form
					id={`${id}-create-category-form`}
					onSubmit={async (event) => {
						event.preventDefault();
						event.stopPropagation();
						await form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.Field name="name">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								const previewSlug =
									field.state.value
										.toLowerCase()
										.trim()
										.replace(/[^a-z0-9]+/g, "-")
										.replace(/(^-|-$)/g, "") || "category-slug";
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name} className="text-zinc-300">
											<Tag className="mr-1 inline size-3.5 text-zinc-500" />
											Category name *
										</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(event) =>
												field.handleChange(event.target.value)
											}
											aria-invalid={isInvalid}
											placeholder="e.g. Wearables"
											className="h-10 border-white/10 bg-zinc-950/50 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-indigo-400/40 focus-visible:ring-indigo-400/20"
										/>
										<FieldDescription className="text-zinc-500">
											Slug preview:{" "}
											<span className="font-mono text-zinc-300">
												{previewSlug}
											</span>
										</FieldDescription>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<div className="flex flex-col-reverse gap-3 border-t border-white/5 pt-5 sm:flex-row sm:items-center sm:justify-end">
							<Button
								type="button"
								variant="ghost"
								onClick={() => form.reset()}
								className="h-10 text-zinc-300 hover:bg-white/5 hover:text-white"
							>
								Reset
							</Button>
							<Button
								disabled={isPending}
								type="submit"
								className="h-10 bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-[0_8px_24px_rgba(99,102,241,0.4)] hover:from-indigo-400 hover:to-violet-400"
							>
								{isPending ? (
									<>
										<Loader className="mr-2 size-4 animate-spin" />
										Creating category...
									</>
								) : (
									<>
										<Boxes className="mr-2 size-4" />
										Create category
									</>
								)}
							</Button>
						</div>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
