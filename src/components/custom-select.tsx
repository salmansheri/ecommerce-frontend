import { useNavigate } from "@tanstack/react-router";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { TCategory } from "@/lib/data/category";
import { CategoryDto, CategoryResponseDto } from "@/generated";
import { useEffect } from "react";

interface CustomSelectProps {
	data?: CategoryDto[];
	value: string;
}

export function CustomSelect({ data, value }: CustomSelectProps) {
	const navigate = useNavigate({ from: "/product" });

	const handleValueChange = (category: string) => {
		navigate({ search: { category: category } });
	};

	useEffect(() => {
		if (!value && data?.length) {
			navigate({
				search:{ category: data[0].id?.toString()},
				replace: true
			})
		}
	})
	return (
		<Select value={value}  onValueChange={handleValueChange}>
			<SelectTrigger className="w-40 sm:min-w-44">
				<SelectValue placeholder="Select a Category" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Categories</SelectLabel>
					{data?.map((category: any) => (
						<SelectItem  key={category.id} value={category?.id}>
							{category.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
