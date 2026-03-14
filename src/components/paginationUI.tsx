import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import type { TProduct } from "@/lib/data/product";
import { useNavigate } from "@tanstack/react-router";

interface PaginationUIProps {
	products: TProduct[];
	page: number;
	pageSize: number;
}
export const PaginationUI = ({
	products,
	page,
	pageSize,
}: PaginationUIProps) => {
	const totalItemCount = products.length;
	const totalPages = Math.ceil(totalItemCount / pageSize);
	const navigate = useNavigate({ from: "/product" });
	const isPrevDisabled = page === 1;
	const isNextDisabled = page >= totalPages;
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => {
							if (isPrevDisabled) return;
							navigate({
								search: (prev) => ({ page: prev.page - 1 }),
							});
						}}
					/>
				</PaginationItem>
				{pages.map((p, index) => (
					<PaginationItem key={p}>
						<PaginationLink
							isActive={p === page}
							onClick={() => {
								navigate({
									search: { page: index + 1 },
								});
							}}
						>
							{index + 1}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext
						onClick={() => {
							if (isNextDisabled) {
								return;
							}
							navigate({
								search: (prev) => ({ page: prev.page + 1 }),
							});
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
