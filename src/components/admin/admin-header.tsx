import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AdminHeader() {
	return (
		<header className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-zinc-900/50 p-3 ring-1 ring-white/5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-4">
			<div className="flex items-center gap-3">
				<SidebarTrigger className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 text-zinc-200 transition-colors hover:bg-white/10 hover:text-white" />
				<div className="min-w-0">
					<h1 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
						Dashboard
					</h1>
					<p className="text-xs text-zinc-500">
						Welcome back, here&apos;s what&apos;s happening today.
					</p>
				</div>
			</div>

			<div className="flex items-center gap-2">
				<div className="relative min-w-0 flex-1 sm:w-72 sm:flex-none">
					<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
					<Input
						className="h-9 rounded-xl border-white/10 bg-zinc-950/50 pl-9 text-zinc-100 shadow-none placeholder:text-zinc-500 focus-visible:border-indigo-400/40 focus-visible:ring-indigo-400/20"
						placeholder="Search..."
					/>
				</div>
				<Button
					variant="outline"
					size="icon"
					className="relative h-9 w-9 rounded-xl border-white/10 bg-white/5 text-zinc-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
					aria-label="Notifications"
				>
					<Bell className="size-4" />
					<span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_6px_rgba(232,121,249,0.8)]" />
				</Button>
			</div>
		</header>
	);
}
