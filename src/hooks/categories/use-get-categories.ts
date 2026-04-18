import { useQuery } from "@tanstack/react-query";
import type { TCategory } from "@/lib/data/category";
import { API_URL } from "@/lib/utils";

async function getCategories() {
	const response = await fetch(
		`${API_URL}/v1/public/categories?sortBy=name&sortOrder=desc&pageSize=20&pageNumber=0`,
		{
			credentials: "include",
		},
	);

	if (!response.ok) {
		const error = await response
			.json()
			.catch(() => ({ message: "Categories Fetcing failed" }));
		throw new Error(error.message);
	}

	return await response.json();
}

export const useGetCategories = () => {
	return useQuery({
		queryKey: ["allCategories"],
		queryFn: getCategories,
	});
};
