import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AdminHeader() {
	return (
		<header className="rounded-xl border border-zinc-200/70 bg-white/90 p-3 shadow-sm backdrop-blur-md sm:rounded-2xl sm:p-5 dark:border-zinc-800 dark:bg-zinc-900/80">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<div className="flex items-start gap-3">
					<SidebarTrigger className="mt-0.5 h-9 w-9 rounded-lg border border-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800" />
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
							Admin Home
						</p>
						<h1 className="mt-1 text-2xl font-bold tracking-tight">
							Dashboard Overview
						</h1>
						<p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
							Monitor performance, process orders, and manage your marketplace.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center">
					<div className="relative w-full">
						<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
						<Input
							className="rounded-xl pl-9"
							placeholder="Search orders, products..."
						/>
					</div>
					<Button
						variant="outline"
						size="icon"
						className="rounded-xl"
						aria-label="Notifications"
					>
						<Bell className="size-4" />
					</Button>
					<Button className="rounded-xl">Create Product</Button>
					<Avatar className="h-9 w-9 border border-zinc-200 dark:border-zinc-700">
						<AvatarFallback>AD</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</header>
	);
}
