import { Link, useLocation } from "@tanstack/react-router";
import {
	Boxes,
	ChartSpline,
	ClipboardCheck,
	LayoutDashboard,
	PackageSearch,
	Settings,
	Store,
} from "lucide-react";
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

const navItems = [
	{ title: "Dashboard", href: "/admin", icon: LayoutDashboard },
	{ title: "Orders", href: "/admin/orders", icon: ClipboardCheck },
	{ title: "Products", href: "/admin/products", icon: PackageSearch },
	{ title: "Categories", href: "/admin/categories", icon: Boxes },
	{ title: "Sellers", href: "/admin/sellers", icon: Store },
] as const;

export function AdminSidebar() {
	const location = useLocation();

	return (
		<Sidebar variant="inset" collapsible="icon">
			<SidebarHeader className="group-data-[collapsible=icon]:items-center">
				<div className="flex items-center gap-3 rounded-xl bg-zinc-900 px-3 py-2 text-white group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 dark:bg-zinc-100 dark:text-zinc-900">
					<div className="rounded-lg bg-white/20 p-2 dark:bg-zinc-900/10">
						<ChartSpline className="size-4" />
					</div>
					<div className="group-data-[collapsible=icon]:hidden">
						<p className="text-sm font-semibold">Admin Studio</p>
						<p className="text-xs opacity-80">Control Center</p>
					</div>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										className="group-data-[collapsible=icon]:justify-center"
										isActive={
											location.pathname === item.href ||
											location.pathname.startsWith(`${item.href}/`)
										}
										tooltip={item.title}
									>
										<Link to={item.href}>
											<item.icon className="size-4" />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							className="group-data-[collapsible=icon]:justify-center"
							tooltip="Admin Settings"
						>
							<Settings className="size-4" />
							<span>Admin Settings</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
