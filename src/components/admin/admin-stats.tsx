import { Boxes, ClipboardCheck, CreditCard, UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
	{
		label: "Total Sales",
		value: "₹18.4L",
		note: "+12.3% from last month",
		icon: CreditCard,
	},
	{
		label: "Orders Today",
		value: "286",
		note: "+31 pending fulfillment",
		icon: ClipboardCheck,
	},
	{
		label: "Active Products",
		value: "1,249",
		note: "43 low stock alerts",
		icon: Boxes,
	},
	{
		label: "Registered Sellers",
		value: "92",
		note: "8 awaiting KYC review",
		icon: UsersRound,
	},
] as const;

export function AdminStats() {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
			{stats.map((item) => (
				<Card
					key={item.label}
					className="rounded-xl border-zinc-200/70 bg-white/90 sm:rounded-2xl dark:border-zinc-800 dark:bg-zinc-900/80"
				>
					<CardHeader className="pb-2 sm:pb-3">
						<div className="mb-2 inline-flex w-fit rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
							<item.icon className="size-4" />
						</div>
						<CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-300">
							{item.label}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-xl font-bold tracking-tight sm:text-2xl">
							{item.value}
						</p>
						<p className="mt-1 text-xs text-zinc-500">{item.note}</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
