import { createFileRoute } from "@tanstack/react-router";
import {
	CreditCard,
	Download,
	Filter,
	IndianRupee,
	MoreHorizontal,
	Package,
	PackageCheck,
	PackageX,
	Search,
	Sparkles,
	Truck,
	Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn, formatNumberToCurrency } from "@/lib/utils";

export const Route = createFileRoute("/admin/orders/")({
	component: RouteComponent,
});

type OrderStatus =
	| "Pending"
	| "Processing"
	| "Shipped"
	| "Delivered"
	| "Cancelled";

interface AdminOrder {
	orderId: number;
	customer: { name: string; email: string };
	itemCount: number;
	totalAmount: number;
	orderDate: string;
	paymentMethod: string;
	status: OrderStatus;
}

const orders: AdminOrder[] = [
	{
		orderId: 2947,
		customer: { name: "Aditi Sharma", email: "aditi.sharma@example.in" },
		itemCount: 3,
		totalAmount: 12_480,
		orderDate: "2026-06-06",
		paymentMethod: "Razorpay",
		status: "Pending",
	},
	{
		orderId: 2946,
		customer: { name: "Rahul Verma", email: "rahul.v@example.in" },
		itemCount: 1,
		totalAmount: 4_320,
		orderDate: "2026-06-06",
		paymentMethod: "Stripe",
		status: "Processing",
	},
	{
		orderId: 2945,
		customer: { name: "Priya Iyer", email: "priya.iyer@example.in" },
		itemCount: 5,
		totalAmount: 28_950,
		orderDate: "2026-06-05",
		paymentMethod: "Razorpay",
		status: "Shipped",
	},
	{
		orderId: 2944,
		customer: { name: "Karthik Reddy", email: "k.reddy@example.in" },
		itemCount: 2,
		totalAmount: 7_640,
		orderDate: "2026-06-05",
		paymentMethod: "COD",
		status: "Delivered",
	},
	{
		orderId: 2943,
		customer: { name: "Neha Kapoor", email: "neha.k@example.in" },
		itemCount: 4,
		totalAmount: 15_200,
		orderDate: "2026-06-04",
		paymentMethod: "Razorpay",
		status: "Delivered",
	},
	{
		orderId: 2942,
		customer: { name: "Vikram Singh", email: "vikram.s@example.in" },
		itemCount: 1,
		totalAmount: 2_199,
		orderDate: "2026-06-04",
		paymentMethod: "UPI",
		status: "Cancelled",
	},
	{
		orderId: 2941,
		customer: { name: "Ananya Patel", email: "ananya.p@example.in" },
		itemCount: 6,
		totalAmount: 42_700,
		orderDate: "2026-06-03",
		paymentMethod: "Razorpay",
		status: "Shipped",
	},
	{
		orderId: 2940,
		customer: { name: "Rohan Mehta", email: "rohan.m@example.in" },
		itemCount: 2,
		totalAmount: 8_490,
		orderDate: "2026-06-03",
		paymentMethod: "Stripe",
		status: "Pending",
	},
];

const stats = [
	{
		label: "Total Orders",
		value: "1,284",
		note: "12.4% higher than last month",
		trend: "+12.4%",
		positive: true,
		icon: Package,
		glow: "from-indigo-500/20 via-indigo-500/5 to-transparent",
		iconClass:
			"bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-indigo-300 ring-indigo-400/30",
		trendClass: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20",
	},
	{
		label: "Pending Review",
		value: "31",
		note: "Awaiting fulfillment confirmation",
		trend: "+4",
		positive: true,
		icon: PackageX,
		glow: "from-amber-500/20 via-amber-500/5 to-transparent",
		iconClass:
			"bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-300 ring-amber-400/30",
		trendClass: "text-amber-300 bg-amber-500/10 border-amber-400/20",
	},
	{
		label: "Shipped Today",
		value: "42",
		note: "In transit with partners",
		trend: "+9.2%",
		positive: true,
		icon: Truck,
		glow: "from-violet-500/20 via-violet-500/5 to-transparent",
		iconClass:
			"bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-violet-300 ring-violet-400/30",
		trendClass: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20",
	},
	{
		label: "Revenue (MTD)",
		value: "₹18.4L",
		note: "Across all payment methods",
		trend: "+18.6%",
		positive: true,
		icon: Wallet,
		glow: "from-emerald-500/20 via-emerald-500/5 to-transparent",
		iconClass:
			"bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-300 ring-emerald-400/30",
		trendClass: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20",
	},
] as const;

function statusClass(status: OrderStatus) {
	switch (status) {
		case "Pending":
			return "bg-amber-500/10 text-amber-300 ring-amber-400/30";
		case "Processing":
			return "bg-indigo-500/10 text-indigo-300 ring-indigo-400/30";
		case "Shipped":
			return "bg-violet-500/10 text-violet-300 ring-violet-400/30";
		case "Delivered":
			return "bg-emerald-500/10 text-emerald-300 ring-emerald-400/30";
		case "Cancelled":
			return "bg-rose-500/10 text-rose-300 ring-rose-400/30";
	}
}

function statusDot(status: OrderStatus) {
	switch (status) {
		case "Pending":
			return "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]";
		case "Processing":
			return "bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.7)]";
		case "Shipped":
			return "bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.7)]";
		case "Delivered":
			return "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]";
		case "Cancelled":
			return "bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.7)]";
	}
}

function formatDate(value: string) {
	return new Date(value).toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
}

function RouteComponent() {
	const [query, setQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

	const filteredOrders = useMemo(() => {
		const q = query.trim().toLowerCase();
		return orders.filter((order) => {
			if (statusFilter !== "all" && order.status !== statusFilter) {
				return false;
			}
			if (!q) {
				return true;
			}
			return (
				order.orderId.toString().includes(q) ||
				order.customer.name.toLowerCase().includes(q) ||
				order.customer.email.toLowerCase().includes(q) ||
				order.paymentMethod.toLowerCase().includes(q)
			);
		});
	}, [query, statusFilter]);

	return (
		<>
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="space-y-1">
					<div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300">
						<Sparkles className="size-3.5" />
						Operations
					</div>
					<h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
						Orders
					</h1>
					<p className="text-sm text-zinc-400">
						Track, fulfill, and audit every order in your marketplace.
					</p>
				</div>
				<Button
					variant="outline"
					className="h-10 w-fit rounded-xl border-white/10 bg-white/5 text-zinc-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
				>
					<Download className="mr-2 size-4" />
					Export CSV
				</Button>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
				{stats.map((item) => (
					<Card
						key={item.label}
						className="group relative overflow-hidden rounded-2xl border-white/10 bg-zinc-900/60 shadow-[0_20px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/5 transition-all hover:border-white/20 hover:shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
					>
						<div
							className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${item.glow} blur-2xl opacity-60 transition-opacity group-hover:opacity-100`}
						/>
						<CardContent className="relative space-y-4 p-5">
							<div className="flex items-start justify-between gap-3">
								<div>
									<p className="text-sm font-medium text-zinc-400">
										{item.label}
									</p>
									<p className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
										{item.value}
									</p>
								</div>
								<div className={cn("rounded-2xl p-3 ring-1", item.iconClass)}>
									<item.icon className="size-5" />
								</div>
							</div>
							<div className="flex items-center justify-between gap-3">
								<span
									className={cn(
										"inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold",
										item.trendClass,
									)}
								>
									{item.trend}
								</span>
								<p className="text-xs text-zinc-500">{item.note}</p>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900/60 shadow-[0_24px_50px_rgba(0,0,0,0.4)] ring-1 ring-white/5">
				<div className="pointer-events-none absolute -top-20 left-1/3 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
				<div className="relative flex flex-col gap-3 border-b border-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">
							Recent orders
						</h2>
						<p className="text-xs text-zinc-500 sm:text-sm">
							{filteredOrders.length} of {orders.length} orders
						</p>
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<div className="relative">
							<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
							<Input
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Search by ID, customer, payment..."
								className="h-10 w-full rounded-xl border-white/10 bg-zinc-950/50 pl-9 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-indigo-400/40 focus-visible:ring-indigo-400/20 sm:w-72"
							/>
						</div>
						<select
							value={statusFilter}
							onChange={(event) =>
								setStatusFilter(event.target.value as OrderStatus | "all")
							}
							className="h-10 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-zinc-200 outline-none transition-colors hover:border-white/20 hover:bg-white/10 focus-visible:border-indigo-400/40 focus-visible:ring-2 focus-visible:ring-indigo-400/20"
							aria-label="Filter by status"
						>
							<option value="all">All Status</option>
							<option value="Pending">Pending</option>
							<option value="Processing">Processing</option>
							<option value="Shipped">Shipped</option>
							<option value="Delivered">Delivered</option>
							<option value="Cancelled">Cancelled</option>
						</select>
						<Button
							variant="outline"
							size="icon"
							className="h-10 w-10 rounded-xl border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
							aria-label="Filter"
						>
							<Filter className="size-4" />
						</Button>
					</div>
				</div>

				<div className="relative p-2 sm:p-4">
					<Table>
						<TableHeader>
							<TableRow className="border-white/5 hover:bg-transparent">
								<TableHead className="text-zinc-500">Order</TableHead>
								<TableHead className="text-zinc-500">Customer</TableHead>
								<TableHead className="text-right text-zinc-500">
									Items
								</TableHead>
								<TableHead className="text-right text-zinc-500">
									Total
								</TableHead>
								<TableHead className="text-zinc-500">Date</TableHead>
								<TableHead className="text-zinc-500">Payment</TableHead>
								<TableHead className="text-zinc-500">Status</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredOrders.length === 0 && (
								<TableRow className="border-white/5 hover:bg-transparent">
									<TableCell
										colSpan={8}
										className="py-10 text-center text-zinc-500"
									>
										{query || statusFilter !== "all"
											? "No orders match your filters."
											: "No orders found."}
									</TableCell>
								</TableRow>
							)}

							{filteredOrders.map((order) => (
								<TableRow
									key={order.orderId}
									className="border-white/5 transition-colors hover:bg-white/[0.02]"
								>
									<TableCell>
										<div className="flex items-center gap-3">
											<span
												className={cn(
													"h-2 w-2 shrink-0 rounded-full",
													statusDot(order.status),
												)}
											/>
											<div className="space-y-0.5">
												<p className="font-medium text-zinc-100">
													#ORD-{order.orderId}
												</p>
												<p className="text-xs text-zinc-500">
													{order.itemCount}{" "}
													{order.itemCount === 1 ? "item" : "items"}
												</p>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<div className="space-y-0.5">
											<p className="font-medium text-zinc-100">
												{order.customer.name}
											</p>
											<p className="text-xs text-zinc-500">
												{order.customer.email}
											</p>
										</div>
									</TableCell>
									<TableCell className="text-right text-zinc-300">
										{order.itemCount}
									</TableCell>
									<TableCell className="text-right font-medium text-white">
										<span className="inline-flex items-center justify-end gap-1">
											<IndianRupee className="size-3 text-zinc-500" />
											{formatNumberToCurrency(order.totalAmount).replace(
												"₹",
												"",
											)}
										</span>
									</TableCell>
									<TableCell className="text-zinc-300">
										{formatDate(order.orderDate)}
									</TableCell>
									<TableCell>
										<span className="inline-flex items-center gap-1.5 text-sm text-zinc-300">
											<CreditCard className="size-3.5 text-zinc-500" />
											{order.paymentMethod}
										</span>
									</TableCell>
									<TableCell>
										<span
											className={cn(
												"inline-flex rounded-full px-2 py-1 text-xs font-medium ring-1",
												statusClass(order.status),
											)}
										>
											{order.status}
										</span>
									</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white"
													aria-label="Open actions"
												>
													<MoreHorizontal className="size-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent
												align="end"
												className="w-44 border-white/10 bg-zinc-900/95 text-zinc-200 backdrop-blur-xl"
											>
												<DropdownMenuLabel className="text-zinc-500">
													#ORD-{order.orderId}
												</DropdownMenuLabel>
												<DropdownMenuSeparator className="bg-white/5" />
												<DropdownMenuItem className="cursor-pointer focus:bg-white/5 focus:text-white">
													<Package className="mr-2 size-3.5" />
													View details
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer focus:bg-white/5 focus:text-white">
													<PackageCheck className="mr-2 size-3.5" />
													Mark as shipped
												</DropdownMenuItem>
												<DropdownMenuItem
													variant="destructive"
													className="cursor-pointer text-rose-300 focus:bg-rose-500/10 focus:text-rose-200"
												>
													<PackageX className="mr-2 size-3.5" />
													Cancel order
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	);
}
