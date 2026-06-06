import { useForm } from "@tanstack/react-form";
import {
	ImageIcon,
	IndianRupee,
	Loader,
	PackagePlus,
	Percent,
	Save,
	Tag,
} from "lucide-react";
import { useEffect, useId } from "react";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ProductDto } from "@/generated";
import { useGetCategories } from "@/hooks/categories/use-get-categories";
import { useUpdateProduct } from "@/hooks/products/use-update-product";

const formSchema = z.object({
	categoryId: z
		.string()
		.min(1, "Please select a category")
		.refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, {
			message: "Invalid category",
		}),
	name: z
		.string()
		.min(3, "Name must be at least 3 characters")
		.max(120, "Name is too long"),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters")
		.max(1000, "Description is too long"),
	quantity: z
		.string()
		.refine((value) => !Number.isNaN(Number(value)), {
			message: "Quantity must be a number",
		})
		.refine((value) => Number(value) >= 0, {
			message: "Quantity cannot be negative",
		}),
	price: z
		.string()
		.refine((value) => !Number.isNaN(Number(value)), {
			message: "Price must be a number",
		})
		.refine((value) => Number(value) > 0, {
			message: "Price must be greater than 0",
		}),
	specialPrice: z
		.string()
		.optional()
		.refine(
			(value) => !value || (!Number.isNaN(Number(value)) && Number(value) >= 0),
			{ message: "Special price must be 0 or more" },
		),
	discount: z
		.string()
		.optional()
		.refine(
			(value) =>
				!value ||
				(!Number.isNaN(Number(value)) &&
					Number(value) >= 0 &&
					Number(value) <= 100),
			{ message: "Discount must be between 0 and 100" },
		),
	imageUrl: z
		.string()
		.optional()
		.refine(
			(value) =>
				!value || /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)$/i.test(value),
			{ message: "Enter a valid image URL" },
		),
});

interface EditProductFormProps {
	product: ProductDto;
}

export function EditProductForm({ product }: EditProductFormProps) {
	const id = useId();
	const { mutate, isPending } = useUpdateProduct();
	const { data: categoriesData, isLoading: isCategoriesLoading } =
		useGetCategories();
	const categories = categoriesData?.data ?? [];

	const form = useForm({
		defaultValues: {
			categoryId: "",
			name: product.name ?? "",
			description: product.description ?? "",
			quantity: product.quantity?.toString() ?? "",
			price: product.price?.toString() ?? "",
			specialPrice: product.specialPrice?.toString() ?? "",
			discount: product.discount?.toString() ?? "",
			imageUrl: product.imageUrl ?? "",
		},
		validators: {
			onSubmit: formSchema,
			onChange: formSchema,
		},
		onSubmit: async ({ value }) => {
			if (!product.productId) {
				return;
			}
			mutate({
				path: { id: product.productId },
				body: {
					productId: product.productId,
					name: value.name,
					description: value.description,
					quantity: Number(value.quantity),
					price: Number(value.price),
					specialPrice: value.specialPrice
						? Number(value.specialPrice)
						: undefined,
					discount: value.discount ? Number(value.discount) : undefined,
					imageUrl: value.imageUrl || undefined,
				},
			});
		},
	});

	useEffect(() => {
		form.reset();
	}, [form]);

	return (
		<Card className="relative w-full overflow-hidden border-white/10 bg-zinc-900/60 shadow-[0_24px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/5 backdrop-blur-xl">
			<div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl" />
			<div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
			<CardHeader className="relative">
				<div className="flex items-center gap-3">
					<span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-indigo-300 ring-1 ring-indigo-400/30">
						<PackagePlus className="size-5" />
					</span>
					<div>
						<CardTitle className="text-xl text-white">
							Edit product details
						</CardTitle>
						<CardDescription className="text-zinc-500">
							Update the catalog information for PRD-
							{product.productId ?? "N/A"}.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="relative">
				<form
					id={`${id}-edit-product-form`}
					onSubmit={async (event) => {
						event.preventDefault();
						event.stopPropagation();
						await form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.Field name="categoryId">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name} className="text-zinc-300">
											<Tag className="mr-1 inline size-3.5 text-zinc-500" />
											Category *
										</FieldLabel>
										<Select
											value={field.state.value}
											onValueChange={(value) => field.handleChange(value)}
										>
											<SelectTrigger
												id={field.name}
												className="h-10 w-full border-white/10 bg-zinc-950/50 text-zinc-100 focus:ring-indigo-400/20"
											>
												<SelectValue
													placeholder={
														isCategoriesLoading
															? "Loading categories..."
															: "Select a category"
													}
												/>
											</SelectTrigger>
											<SelectContent>
												{categories.length === 0 ? (
													<div className="p-2 text-sm text-zinc-500">
														No categories available
													</div>
												) : (
													categories.map((category) => (
														<SelectItem
															key={category.id}
															value={String(category.id)}
														>
															{category.name}
														</SelectItem>
													))
												)}
											</SelectContent>
										</Select>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<form.Field name="name">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name} className="text-zinc-300">
											Product name *
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
											placeholder="e.g. Wireless Noise Cancelling Headphones"
											className="h-10 border-white/10 bg-zinc-950/50 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-indigo-400/40 focus-visible:ring-indigo-400/20"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<form.Field name="description">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name} className="text-zinc-300">
											Description *
										</FieldLabel>
										<Textarea
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(event) =>
												field.handleChange(event.target.value)
											}
											aria-invalid={isInvalid}
											placeholder="Describe the product, its features and key selling points..."
											rows={4}
											className="border-white/10 bg-zinc-950/50 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-indigo-400/40 focus-visible:ring-indigo-400/20"
										/>
										<FieldDescription className="text-zinc-500">
											{field.state.value.length}/1000 characters
										</FieldDescription>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<div className="grid gap-5 sm:grid-cols-2">
							<form.Field name="price">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel
												htmlFor={field.name}
												className="text-zinc-300"
											>
												<IndianRupee className="mr-1 inline size-3.5 text-zinc-500" />
												Price (₹) *
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												type="number"
												inputMode="decimal"
												min="0"
												step="0.01"
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(event) =>
													field.handleChange(event.target.value)
												}
												aria-invalid={isInvalid}
												placeholder="0.00"
												className="h-10 border-white/10 bg-zinc-950/50 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-indigo-400/40 focus-visible:ring-indigo-400/20"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>

							<form.Field name="specialPrice">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel
												htmlFor={field.name}
												className="text-zinc-300"
											>
												<IndianRupee className="mr-1 inline size-3.5 text-zinc-500" />
												Special price (₹)
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												type="number"
												inputMode="decimal"
												min="0"
												step="0.01"
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(event) =>
													field.handleChange(event.target.value)
												}
												aria-invalid={isInvalid}
												placeholder="Optional"
												className="h-10 border-white/10 bg-zinc-950/50 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-indigo-400/40 focus-visible:ring-indigo-400/20"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>

							<form.Field name="discount">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel
												htmlFor={field.name}
												className="text-zinc-300"
											>
												<Percent className="mr-1 inline size-3.5 text-zinc-500" />
												Discount (%)
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												type="number"
												inputMode="numeric"
												min="0"
												max="100"
												step="1"
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(event) =>
													field.handleChange(event.target.value)
												}
												aria-invalid={isInvalid}
												placeholder="0"
												className="h-10 border-white/10 bg-zinc-950/50 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-indigo-400/40 focus-visible:ring-indigo-400/20"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>

							<form.Field name="quantity">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel
												htmlFor={field.name}
												className="text-zinc-300"
											>
												Stock quantity *
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												type="number"
												inputMode="numeric"
												min="0"
												step="1"
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(event) =>
													field.handleChange(event.target.value)
												}
												aria-invalid={isInvalid}
												placeholder="0"
												className="h-10 border-white/10 bg-zinc-950/50 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-indigo-400/40 focus-visible:ring-indigo-400/20"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>
						</div>

						<form.Field name="imageUrl">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name} className="text-zinc-300">
											<ImageIcon className="mr-1 inline size-3.5 text-zinc-500" />
											Image URL
										</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											type="url"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(event) =>
												field.handleChange(event.target.value)
											}
											aria-invalid={isInvalid}
											placeholder="https://example.com/product.jpg"
											className="h-10 border-white/10 bg-zinc-950/50 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-indigo-400/40 focus-visible:ring-indigo-400/20"
										/>
										<FieldDescription className="text-zinc-500">
											Optional. Direct link to a product image (JPG, PNG, WEBP).
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
								disabled={isPending}
								type="submit"
								className="h-10 bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-[0_8px_24px_rgba(99,102,241,0.4)] hover:from-indigo-400 hover:to-violet-400"
							>
								{isPending ? (
									<>
										<Loader className="mr-2 size-4 animate-spin" />
										Saving changes...
									</>
								) : (
									<>
										<Save className="mr-2 size-4" />
										Save changes
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
