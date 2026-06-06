import {
	ArrowUpRight,
	BadgeCheck,
	Clock3,
	Package2,
	TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const trendPoints = [
	{ day: "Mon", value: 42 },
	{ day: "Tue", value: 58 },
	{ day: "Wed", value: 46 },
	{ day: "Thu", value: 66 },
	{ day: "Fri", value: 61 },
	{ day: "Sat", value: 80 },
	{ day: "Sun", value: 72 },
] as const;

const activities = [
	{
		title: "Order #ORD-2947 placed by Aditi Sharma",
		time: "5 min ago",
		dot: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]",
	},
	{
		title: "Seller request from Nova Tech requires approval",
		time: "18 min ago",
		dot: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]",
	},
	{
		title: "Low inventory alert for Noise Cancelling Headphones",
		time: "42 min ago",
		dot: "bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.8)]",
	},
	{
		title: "Category 'Wearables' updated by Admin",
		time: "1 hr ago",
		dot: "bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]",
	},
] as const;

const tasks = [
	{
		label: "Pending Orders",
		value: "31",
		icon: Package2,
		accent: "from-indigo-500/20 to-violet-500/10",
		iconColor: "text-indigo-300",
	},
	{
		label: "Seller Verifications",
		value: "8",
		icon: BadgeCheck,
		accent: "from-fuchsia-500/20 to-pink-500/10",
		iconColor: "text-fuchsia-300",
	},
] as const;

export function AdminInsights() {
	return (
		<div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_360px]">
			<Card className="relative overflow-hidden rounded-[1.6rem] border-white/10 bg-zinc-900/60 shadow-[0_24px_50px_rgba(0,0,0,0.4)] ring-1 ring-white/5">
				<div className="pointer-events-none absolute -top-20 left-1/3 h-48 w-48 rounded-full bg-indigo-500/15 blur-3xl" />
				<CardHeader className="relative flex flex-col gap-5 border-b border-white/5 pb-5 sm:flex-row sm:items-start sm:justify-between">
					<div>
						<CardTitle className="flex items-center gap-2 text-lg text-white">
							<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-indigo-300 ring-1 ring-indigo-400/30">
								<TrendingUp className="size-4" />
							</span>
							Revenue Performance
						</CardTitle>
						<p className="mt-2 text-sm text-zinc-400">
							Weekly trend across sales, payouts, and order velocity.
						</p>
					</div>
					<div className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/15 to-teal-500/10 px-4 py-3 text-right">
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
							Weekly Growth
						</p>
						<p className="mt-2 inline-flex items-center gap-1 text-2xl font-semibold text-white">
							<ArrowUpRight className="size-5 text-emerald-400" />
							18.6%
						</p>
					</div>
				</CardHeader>
				<CardContent className="relative space-y-6 pt-6">
					<div className="rounded-[1.4rem] border border-white/5 bg-gradient-to-br from-zinc-950/80 to-zinc-900/40 p-4">
						<div className="flex h-64 items-end gap-3">
							{trendPoints.map((point, index) => (
								<div
									key={point.day}
									className="flex flex-1 flex-col items-center justify-end gap-3"
								>
									<div className="relative flex h-full w-full items-end">
										<div
											className="w-full rounded-t-[0.75rem] bg-gradient-to-t from-indigo-500 via-violet-500 to-fuchsia-400 shadow-[0_12px_30px_rgba(99,102,241,0.45)] ring-1 ring-inset ring-white/10"
											style={{
												height: `${point.value * 2}px`,
												animationDelay: `${index * 60}ms`,
											}}
										>
											<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
										</div>
									</div>
									<span className="text-xs font-medium text-zinc-500">
										{point.day}
									</span>
								</div>
							))}
						</div>
					</div>

					<div className="grid gap-3 sm:grid-cols-3">
						<div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
							<p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
								Best Day
							</p>
							<p className="mt-2 text-lg font-semibold text-white">Saturday</p>
						</div>
						<div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
							<p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
								Refund Rate
							</p>
							<p className="mt-2 text-lg font-semibold text-white">1.8%</p>
						</div>
						<div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
							<p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
								Avg. Basket
							</p>
							<p className="mt-2 text-lg font-semibold text-white">₹4,320</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-4">
				<Card className="relative overflow-hidden rounded-[1.6rem] border-white/10 bg-zinc-900/60 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ring-1 ring-white/5">
					<CardHeader className="relative">
						<CardTitle className="flex items-center gap-2 text-base text-white">
							<span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-zinc-300 ring-1 ring-white/10">
								<Clock3 className="size-3.5" />
							</span>
							Recent Activity
						</CardTitle>
					</CardHeader>
					<CardContent className="relative space-y-2.5">
						{activities.map((item) => (
							<div
								key={item.title}
								className="group/item relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
							>
								<div className="flex items-start gap-3">
									<span
										className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.dot}`}
									/>
									<div className="min-w-0 flex-1">
										<p className="text-sm font-medium leading-6 text-zinc-200">
											{item.title}
										</p>
										<p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-zinc-500">
											{item.time}
										</p>
									</div>
								</div>
							</div>
						))}
					</CardContent>
				</Card>

				<Card className="relative overflow-hidden rounded-[1.6rem] border-white/10 bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-fuchsia-500/10 shadow-[0_24px_50px_rgba(99,102,241,0.2)] ring-1 ring-white/10">
					<div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-indigo-500/30 blur-3xl" />
					<div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
					<CardHeader className="relative">
						<CardTitle className="text-base text-white">
							Quick Snapshot
						</CardTitle>
					</CardHeader>
					<CardContent className="relative space-y-3">
						{tasks.map((item) => (
							<div
								key={item.label}
								className="group/task flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10"
							>
								<span
									className={`inline-flex items-center gap-2 text-sm text-zinc-200`}
								>
									<span
										className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${item.accent} ${item.iconColor} ring-1 ring-white/10`}
									>
										<item.icon className="size-3.5" />
									</span>
									{item.label}
								</span>
								<span className="text-lg font-semibold text-white">
									{item.value}
								</span>
							</div>
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
