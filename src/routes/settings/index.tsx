import { createFileRoute } from "@tanstack/react-router";
import {
	Bell,
	ChevronRight,
	Eye,
	EyeOff,
	Globe,
	Lock,
	LogOut,
	Moon,
	Save,
	Sun,
	Trash2,
	User,
} from "lucide-react";
import { useId, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/auth-store";
import { UseSignOut } from "@/hooks/auth/use-sign-out";

const settingsSections = [
	{ id: "profile", label: "Profile", icon: User },
	{ id: "password", label: "Password", icon: Lock },
	{ id: "notifications", label: "Notifications", icon: Bell },
	{ id: "appearance", label: "Appearance", icon: Sun },
	{ id: "danger", label: "Danger Zone", icon: Trash2 },
] as const;

type SectionId = (typeof settingsSections)[number]["id"];

export const Route = createFileRoute("/settings/")({
	component: SettingsPage,
});

function SettingsPage() {
	const { username, roles } = useAuth();
	const { mutate: signOut } = UseSignOut();
	const [activeSection, setActiveSection] = useState<SectionId>("profile");
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const uid = useId();
	const [emailNotif, setEmailNotif] = useState(true);
	const [pushNotif, setPushNotif] = useState(false);
	const [promoNotif, setPromoNotif] = useState(true);
	const [theme, setTheme] = useState<"dark" | "light">("dark");

	const handleSave = () => {
		toast.success("Settings saved");
	};

	const handleSignOut = () => {
		signOut({});
	};

	const renderSection = () => {
		switch (activeSection) {
			case "profile":
				return (
					<Card>
						<CardHeader>
							<CardTitle>Profile</CardTitle>
							<CardDescription>
								Manage your personal information and how it appears publicly.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-center gap-5">
								<Avatar size="lg" className="size-16">
									<AvatarFallback className="text-lg">
										{username?.[0]?.toUpperCase() ?? "U"}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-semibold text-base">{username ?? "User"}</p>
									<p className="text-sm text-muted-foreground">
										{roles?.join(", ") ?? "Customer"}
									</p>
								</div>
								<Button
									variant="outline"
									size="sm"
									className="ml-auto rounded-full"
								>
									Change avatar
								</Button>
							</div>

							<Separator />

							<div className="space-y-4">
								<div className="grid gap-3 sm:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor={`${uid}-username`}>Username</Label>
										<Input
											id={`${uid}-username`}
											defaultValue={username ?? ""}
											className="h-10 bg-background/70"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor={`${uid}-email`}>Email</Label>
										<Input
											id={`${uid}-email`}
											type="email"
											placeholder="user@example.com"
											className="h-10 bg-background/70"
										/>
									</div>
								</div>
								<div className="grid gap-3 sm:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor={`${uid}-phone`}>Phone</Label>
										<Input
											id={`${uid}-phone`}
											placeholder="+1 (555) 000-0000"
											className="h-10 bg-background/70"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor={`${uid}-location`}>Location</Label>
										<Input
											id={`${uid}-location`}
											placeholder="New York, USA"
											className="h-10 bg-background/70"
										/>
									</div>
								</div>
							</div>

							<div className="flex justify-end">
								<Button
									onClick={handleSave}
									className="rounded-full bg-foreground text-background hover:bg-foreground/90"
								>
									<Save className="size-4" />
									Save changes
								</Button>
							</div>
						</CardContent>
					</Card>
				);

			case "password":
				return (
					<Card>
						<CardHeader>
							<CardTitle>Change password</CardTitle>
							<CardDescription>
								Update your password to keep your account secure.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-5">
							<div className="space-y-2">
								<Label htmlFor={`${uid}-current-password`}>Current password</Label>
								<div className="relative">
									<Input
										id={`${uid}-current-password`}
										type={showCurrentPassword ? "text" : "password"}
										placeholder="Enter current password"
										className="h-10 bg-background/70 pr-10"
									/>
									<button
										type="button"
										onClick={() => setShowCurrentPassword(!showCurrentPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
									>
										{showCurrentPassword ? (
											<EyeOff className="size-4" />
										) : (
											<Eye className="size-4" />
										)}
									</button>
								</div>
							</div>
							<div className="grid gap-3 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor={`${uid}-new-password`}>New password</Label>
									<div className="relative">
										<Input
											id={`${uid}-new-password`}
											type={showNewPassword ? "text" : "password"}
											placeholder="Enter new password"
											className="h-10 bg-background/70 pr-10"
										/>
										<button
											type="button"
											onClick={() => setShowNewPassword(!showNewPassword)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
										>
											{showNewPassword ? (
												<EyeOff className="size-4" />
											) : (
												<Eye className="size-4" />
											)}
										</button>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor={`${uid}-confirm-password`}>Confirm password</Label>
									<Input
										id={`${uid}-confirm-password`}
										type="password"
										placeholder="Re-enter new password"
										className="h-10 bg-background/70"
									/>
								</div>
							</div>
							<div className="flex justify-end">
								<Button
									onClick={handleSave}
									className="rounded-full bg-foreground text-background hover:bg-foreground/90"
								>
									<Save className="size-4" />
									Update password
								</Button>
							</div>
						</CardContent>
					</Card>
				);

			case "notifications":
				return (
					<Card>
						<CardHeader>
							<CardTitle>Notifications</CardTitle>
							<CardDescription>
								Choose what notifications you receive and how you receive them.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-5">
							<div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/50 p-4">
								<div className="space-y-0.5">
									<p className="text-sm font-medium">Email notifications</p>
									<p className="text-xs text-muted-foreground">
										Receive order updates and receipts via email.
									</p>
								</div>
								<Switch
									checked={emailNotif}
									onCheckedChange={setEmailNotif}
								/>
							</div>
							<div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/50 p-4">
								<div className="space-y-0.5">
									<p className="text-sm font-medium">Push notifications</p>
									<p className="text-xs text-muted-foreground">
										Get instant updates on your device.
									</p>
								</div>
								<Switch
									checked={pushNotif}
									onCheckedChange={setPushNotif}
								/>
							</div>
							<div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/50 p-4">
								<div className="space-y-0.5">
									<p className="text-sm font-medium">Promotional emails</p>
									<p className="text-xs text-muted-foreground">
										Receive offers, discounts, and new product announcements.
									</p>
								</div>
								<Switch
									checked={promoNotif}
									onCheckedChange={setPromoNotif}
								/>
							</div>
						</CardContent>
					</Card>
				);

			case "appearance":
				return (
					<Card>
						<CardHeader>
							<CardTitle>Appearance</CardTitle>
							<CardDescription>
								Customize the look and feel of your experience.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-5">
							<div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/50 p-4">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-full bg-muted">
										{theme === "dark" ? (
											<Moon className="size-4" />
										) : (
											<Sun className="size-4" />
										)}
									</div>
									<div className="space-y-0.5">
										<p className="text-sm font-medium">Theme</p>
										<p className="text-xs text-muted-foreground">
											{theme === "dark"
												? "Dark mode is active"
												: "Light mode is active"}
										</p>
									</div>
								</div>
								<Switch
									checked={theme === "dark"}
									onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
								/>
							</div>
							<div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/50 p-4">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-full bg-muted">
										<Globe className="size-4" />
									</div>
									<div className="space-y-0.5">
										<p className="text-sm font-medium">Language</p>
										<p className="text-xs text-muted-foreground">
											English (US)
										</p>
									</div>
								</div>
								<Button variant="ghost" size="sm" className="rounded-full text-xs">
									Change
								</Button>
							</div>
						</CardContent>
					</Card>
				);

			case "danger":
				return (
					<Card className="border-destructive/30">
						<CardHeader>
							<CardTitle className="text-destructive">Danger Zone</CardTitle>
							<CardDescription>
								Irreversible account actions. Proceed with caution.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between rounded-xl border border-destructive/20 bg-destructive/5 p-4">
								<div className="space-y-0.5">
									<p className="text-sm font-medium">Sign out</p>
									<p className="text-xs text-muted-foreground">
										End your current session across all devices.
									</p>
								</div>
								<Button
									variant="outline"
									size="sm"
									onClick={handleSignOut}
									className="rounded-full border-destructive/30 text-destructive hover:bg-destructive/10"
								>
									<LogOut className="size-4" />
									Sign out
								</Button>
							</div>
							<div className="flex items-center justify-between rounded-xl border border-destructive/20 bg-destructive/5 p-4">
								<div className="space-y-0.5">
									<p className="text-sm font-medium">Delete account</p>
									<p className="text-xs text-muted-foreground">
										Permanently delete your account and all associated data.
									</p>
								</div>
								<Button
									variant="outline"
									size="sm"
									className="rounded-full border-destructive/30 text-destructive hover:bg-destructive/10"
								>
									<Trash2 className="size-4" />
									Delete
								</Button>
							</div>
						</CardContent>
					</Card>
				);
		}
	};

	return (
		<section className="min-h-screen bg-linear-to-b from-background via-background to-muted/30 px-4 py-8 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8">
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
						Settings
					</p>
					<h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
						Account settings
					</h1>
					<p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
						Manage your profile, notifications, and security preferences.
					</p>
				</div>

				<div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
					{/* Sidebar */}
					<nav className="h-fit rounded-2xl border border-border/70 bg-card p-2 shadow-sm lg:sticky lg:top-28">
						{settingsSections.map((section) => {
							const Icon = section.icon;
							const isActive = activeSection === section.id;
							const isDanger = section.id === "danger";
							return (
								<button
									key={section.id}
									type="button"
									onClick={() => setActiveSection(section.id)}
									className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
										isActive
											? "bg-accent text-accent-foreground"
											: isDanger
												? "text-muted-foreground hover:text-destructive"
												: "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
									}`}
								>
									<Icon className="size-4 shrink-0" />
									<span className="flex-1">{section.label}</span>
									<ChevronRight
										className={`size-3.5 transition-transform ${
											isActive ? "translate-x-0.5" : "text-transparent"
										}`}
									/>
								</button>
							);
						})}
					</nav>

					{/* Content */}
					<div className="min-h-0">{renderSection()}</div>
				</div>
			</div>
		</section>
	);
}
