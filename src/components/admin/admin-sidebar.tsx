import { Link, useLocation } from "@tanstack/react-router";
import {
	Boxes,
	ChartSpline,
	ClipboardCheck,
	LayoutDashboard,
	LogOut,
	PackageSearch,
	Settings,
	Store,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { UseSignOut } from "@/hooks/auth/use-sign-out";
import { useAuth } from "@/lib/auth-store";

const navItems = [
	{ title: "Dashboard", href: "/admin", icon: LayoutDashboard },
	{ title: "Orders", href: "/admin/orders", icon: ClipboardCheck },
	{ title: "Products", href: "/admin/products", icon: PackageSearch },
	{ title: "Categories", href: "/admin/categories", icon: Boxes },
	{ title: "Sellers", href: "/admin/sellers", icon: Store },
] as const;

export function AdminSidebar() {
	const location = useLocation();
	const username = useAuth((state) => state.username);
	const { mutate: signOut } = UseSignOut();

	const displayName = username?.trim() ? username : "Admin";
	const initials = displayName
		.split(/\s+/)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.slice(0, 2)
		.join("");

	return (
		<Sidebar
			variant="inset"
			collapsible="icon"
			className="group-data-[variant=inset]:bg-transparent"
		>
			<SidebarHeader className="p-3 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:items-center">
				<div className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-zinc-900/60 p-2.5 ring-1 ring-white/5 group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:rounded-xl">
					<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[0_6px_18px_rgba(99,102,241,0.45)]">
						<ChartSpline className="size-4 text-white" />
					</div>
					<div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
						<p className="truncate text-sm font-semibold tracking-tight text-white">
							Admin Studio
						</p>
						<p className="truncate text-xs text-zinc-500">Control Center</p>
					</div>
				</div>
			</SidebarHeader>

			<SidebarContent className="bg-transparent px-3 py-4 group-data-[collapsible=icon]:px-2">
				<SidebarGroup className="group-data-[collapsible=icon]:p-0">
					<SidebarGroupLabel className="px-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-zinc-500 group-data-[collapsible=icon]:hidden">
						Navigation
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="gap-1.5">
							{navItems.map((item) => {
								const isActive =
									location.pathname === item.href ||
									location.pathname.startsWith(`${item.href}/`);
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											isActive={isActive}
											tooltip={item.title}
											className="h-10 rounded-xl border border-transparent text-zinc-400 transition-colors hover:border-white/10 hover:bg-white/5 hover:text-zinc-100 data-[active=true]:border-indigo-400/20 data-[active=true]:bg-indigo-500/10 data-[active=true]:text-white data-[active=true]:shadow-[inset_0_0_0_1px_rgba(99,102,241,0.15)]"
										>
											<Link to={item.href}>
												<item.icon
													className={
														isActive
															? "size-4 shrink-0 text-indigo-300"
															: "size-4 shrink-0 text-zinc-400"
													}
												/>
												<span className="truncate font-medium group-data-[collapsible=icon]:hidden">
													{item.title}
												</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="bg-transparent p-3 group-data-[collapsible=icon]:p-2">
				<div className="mb-2 flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-2 group-data-[collapsible=icon]:hidden">
					<Avatar className="h-8 w-8 border border-white/10 ring-2 ring-indigo-500/30">
						<AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-semibold text-white">
							{initials || "AD"}
						</AvatarFallback>
					</Avatar>
					<div className="min-w-0 flex-1">
						<p className="truncate text-sm font-medium text-zinc-100">
							{displayName}
						</p>
						<p className="truncate text-xs text-zinc-500">Administrator</p>
					</div>
					<button
						type="button"
						onClick={() => signOut()}
						className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200"
						aria-label="Sign out"
					>
						<LogOut className="size-3.5" />
					</button>
				</div>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							className="h-10 rounded-xl border border-white/5 bg-white/[0.02] text-zinc-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
							tooltip="Admin Settings"
						>
							<Settings className="size-4 shrink-0" />
							<span className="truncate font-medium group-data-[collapsible=icon]:hidden">
								Admin Settings
							</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>

			<SidebarRail className="after:bg-white/10 hover:after:bg-white/20" />
		</Sidebar>
	);
}
