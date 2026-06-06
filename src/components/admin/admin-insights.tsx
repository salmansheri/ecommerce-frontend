import { BadgeCheck, Clock3, Package2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
	"Order #ORD-2947 placed by Aditi Sharma",
	"Seller request from Nova Tech requires approval",
	"Low inventory alert for Noise Cancelling Headphones",
	"Category 'Wearables' updated by Admin",
] as const;

export function AdminInsights() {
	return (
		<div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
			<Card className="rounded-xl border-zinc-200/70 bg-white/90 sm:rounded-2xl lg:col-span-2 dark:border-zinc-800 dark:bg-zinc-900/80">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-base">
						<Clock3 className="size-4" />
						Recent Activity
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					{activities.map((item) => (
						<div
							key={item}
							className="rounded-lg border border-zinc-200/70 bg-zinc-50 px-3 py-2 text-sm leading-relaxed dark:border-zinc-800 dark:bg-zinc-900"
						>
							{item}
						</div>
					))}
				</CardContent>
			</Card>

			<Card className="rounded-xl border-zinc-200/70 bg-white/90 sm:rounded-2xl dark:border-zinc-800 dark:bg-zinc-900/80">
				<CardHeader>
					<CardTitle className="text-base">Quick Snapshot</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 text-sm">
					<div className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200/70 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
						<span className="inline-flex items-center gap-2">
							<Package2 className="size-4" /> Pending Orders
						</span>
						<span className="font-semibold">31</span>
					</div>
					<div className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200/70 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
						<span className="inline-flex items-center gap-2">
							<BadgeCheck className="size-4" /> Seller Verifications
						</span>
						<span className="font-semibold">8</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
