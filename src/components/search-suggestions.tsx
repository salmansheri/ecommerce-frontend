import { useNavigate } from "@tanstack/react-router";
import { Search, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/generated";

const SUGGESTION_PAGE_SIZE = 50;

type Suggestion = {
	productId: number;
	name: string;
	imageUrl?: string;
	price?: number;
};

export function SearchSuggestions({
	placeholder = "Search products...",
	className,
	mobile,
	onNavigate,
}: {
	placeholder?: string;
	className?: string;
	mobile?: boolean;
	onNavigate?: () => void;
}) {
	const navigate = useNavigate();
	const [query, setQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [highlightIndex, setHighlightIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedQuery(query), 200);
		return () => clearTimeout(timer);
	}, [query]);

	const { data: productsData, isLoading } = useQuery({
		queryKey: ["search-suggestions", debouncedQuery],
		queryFn: async () => {
			if (!debouncedQuery) return [];
			const res = await getProducts({
				query: {
					keyword: debouncedQuery,
					pageNumber: 0,
					pageSize: SUGGESTION_PAGE_SIZE,
					sortBy: "name",
					sortOrder: "asc",
				},
			});
			return (res.data?.data ?? []) as Suggestion[];
		},
		enabled: debouncedQuery.length > 0,
		staleTime: 60000,
	});

	const suggestions = productsData ?? [];

	const filteredSuggestions = suggestions.filter((s) =>
		s.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
	);
	const showSuggestions =
		isOpen && query.length > 0 && filteredSuggestions.length > 0;

	const submitSearch = useCallback(
		(term: string) => {
			setIsOpen(false);
			setQuery(term);
			onNavigate?.();
			navigate({ to: "/search", search: { q: term } });
		},
		[navigate, onNavigate],
	);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (highlightIndex >= 0 && filteredSuggestions[highlightIndex]) {
				submitSearch(filteredSuggestions[highlightIndex].name);
			} else {
				submitSearch(query);
			}
		}
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setHighlightIndex((i) =>
				Math.min(i + 1, filteredSuggestions.length - 1),
			);
		}
		if (e.key === "ArrowUp") {
			e.preventDefault();
			setHighlightIndex((i) => Math.max(i - 1, 0));
		}
		if (e.key === "Escape") {
			setIsOpen(false);
			inputRef.current?.blur();
		}
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node) &&
				inputRef.current &&
				!inputRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={dropdownRef}>
			<div className="relative">
				<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					ref={inputRef}
					type="search"
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
						setIsOpen(true);
						setHighlightIndex(-1);
					}}
					onFocus={() => setIsOpen(true)}
					placeholder={placeholder}
					onKeyDown={handleKeyDown}
					className={`h-10 rounded-full border-border/70 bg-card pl-9 pr-4 ${className ?? ""}`}
				/>
				{isLoading && (
					<Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
				)}
			</div>

			{/* Suggestions dropdown */}
			{showSuggestions && (
				<div
					className={`absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xl backdrop-blur-xl ${mobile ? "" : ""}`}
				>
					<div className="p-1.5">
						{filteredSuggestions.slice(0, 7).map((suggestion, index) => (
							<button
								type="button"
								key={suggestion.productId}
								onClick={() => submitSearch(suggestion.name)}
								onMouseEnter={() => setHighlightIndex(index)}
								className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
									index === highlightIndex
										? "bg-accent text-accent-foreground"
										: "text-foreground hover:bg-accent/50"
								}`}
							>
								{suggestion.imageUrl ? (
									<img
										src={suggestion.imageUrl}
										alt=""
										className="size-8 shrink-0 rounded-lg border border-border/60 object-cover"
									/>
								) : (
									<div className="size-8 shrink-0 rounded-lg bg-muted flex items-center justify-center">
										<Search className="size-3.5 text-muted-foreground" />
									</div>
								)}
								<div className="flex-1 min-w-0">
									<p className="truncate font-medium">{suggestion.name}</p>
									{suggestion.price != null && (
										<p className="text-xs text-muted-foreground">
											${suggestion.price.toFixed(2)}
										</p>
									)}
								</div>
							</button>
						))}
					</div>
					<div className="border-t border-border/50 px-3 py-2">
						<button
							type="button"
							onClick={() => submitSearch(query)}
							className="flex w-full items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
						>
							<Search className="size-3" />
							Search for &ldquo;{query}&rdquo;
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
