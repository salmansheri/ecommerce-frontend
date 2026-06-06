import {
	ArrowDownRight,
	ArrowUpRight,
	Boxes,
	ClipboardCheck,
	CreditCard,
	UsersRound,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
	{
		label: "Gross Sales",
		value: "₹18.4L",
		note: "12.3% higher than last month",
		trend: "+12.3%",
		positive: true,
		icon: CreditCard,
		glow: "from-sky-500/20 via-sky-500/5 to-transparent",
		iconClass:
			"bg-gradient-to-br from-sky-500/20 to-indigo-500/20 text-sky-300 ring-sky-400/30",
		trendClass: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20",
	},
	{
		label: "Orders Today",
		value: "286",
		note: "31 orders are pending fulfillment",
		trend: "+8.4%",
		positive: true,
		icon: ClipboardCheck,
		glow: "from-emerald-500/20 via-emerald-500/5 to-transparent",
		iconClass:
			"bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-300 ring-emerald-400/30",
		trendClass: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20",
	},
	{
		label: "Active Products",
		value: "1,249",
		note: "43 products hit low-stock threshold",
		trend: "-2.1%",
		positive: false,
		icon: Boxes,
		glow: "from-amber-500/20 via-amber-500/5 to-transparent",
		iconClass:
			"bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-300 ring-amber-400/30",
		trendClass: "text-amber-300 bg-amber-500/10 border-amber-400/20",
	},
	{
		label: "Verified Sellers",
		value: "92",
		note: "8 seller profiles are awaiting KYC review",
		trend: "+5.6%",
		positive: true,
		icon: UsersRound,
		glow: "from-fuchsia-500/20 via-fuchsia-500/5 to-transparent",
		iconClass:
			"bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 text-fuchsia-300 ring-fuchsia-400/30",
		trendClass: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20",
	},
] as const;

export function AdminStats() {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
			{stats.map((item) => (
				<Card
					key={item.label}
					className="group relative overflow-hidden rounded-[1.5rem] border-white/10 bg-zinc-900/60 shadow-[0_20px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/5 transition-all hover:border-white/20 hover:shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
				>
					<div
						className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${item.glow} blur-2xl opacity-60 transition-opacity group-hover:opacity-100`}
					/>
					<CardHeader className="relative pb-3">
						<div className="flex items-start justify-between gap-3">
							<div>
								<CardTitle className="text-sm font-medium text-zinc-400">
									{item.label}
								</CardTitle>
								<p className="mt-3 text-3xl font-semibold tracking-tight text-white">
									{item.value}
								</p>
							</div>
							<div className={`rounded-2xl p-3 ring-1 ${item.iconClass}`}>
								<item.icon className="size-5" />
							</div>
						</div>
					</CardHeader>
					<CardContent className="relative space-y-3 pt-4">
						<div
							className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${item.trendClass}`}
						>
							{item.positive ? (
								<ArrowUpRight className="size-3.5" />
							) : (
								<ArrowDownRight className="size-3.5" />
							)}
							{item.trend}
						</div>
						<p className="text-sm leading-6 text-zinc-400">{item.note}</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
