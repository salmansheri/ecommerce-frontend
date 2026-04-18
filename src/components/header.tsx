import { Link } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import {
	Heart,
	Search,
	ShoppingBag,
	ShoppingCart,
	UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cartItemCountStore } from "@/lib/cart-store";
import { authStore } from "@/lib/auth-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; 

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import { Loader } from "./loader";
import { UseSignOut } from "@/hooks/auth/use-sign-out";

const navigationLinks = [
	{ label: "Home", to: "/" },
	{ label: "Shop", to: "/product" },
	{ label: "Cart", to: "/cart" },
	{
		label: "Deals",
		to: "/product",
		search: { sortBy: "price", sortOrder: "asc", page: 1, category: "" },
	},
	{ label: "New Arrivals", to: "/product", search: { page: 1, category: "" } },
] as const;

const Header = () => {
	const cartItemCount = useStore(cartItemCountStore);
	

	const currentUserName = authStore?.state.user?.username; 
	const { mutate } = UseSignOut(); 

	const signout = () => {
		mutate({}); 
	}
	


	

	

	

	return (
		<header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
			<div className="bg-gradient-to-r from-amber-300/20 via-orange-300/15 to-rose-300/20">
				<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2 text-center text-xs font-medium tracking-wide text-foreground/90 sm:px-6 lg:px-8">
					Free shipping on orders over $75 + 30-day easy returns
				</div>
			</div>

			<div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between gap-3">
					<Link
						to="/"
						className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-2 shadow-sm transition-colors hover:bg-accent"
					>
						<span className="inline-flex size-8 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:rotate-6">
							<ShoppingBag className="size-4" />
						</span>
						<span className="text-base font-semibold tracking-tight sm:text-lg">
							ShopVerse
						</span>
					</Link>

					<div className="hidden flex-1 px-3 lg:block">
						<div className="relative mx-auto max-w-md">
							<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search products, brands, categories..."
								className="h-10 rounded-full border-border/70 bg-card pl-9 pr-4"
							/>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<Button variant="ghost" size="icon" aria-label="Wishlist">
							<Heart className="size-4" />
						</Button>
						<Button asChild variant="ghost" size="icon" aria-label="Cart">
							<Link to="/cart" className="relative">
								<ShoppingCart className="size-4" />
								{cartItemCount > 0 && (
									<span className="absolute -right-2 -top-2 inline-flex min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium leading-none text-background">
										{cartItemCount > 99 ? "99+" : cartItemCount}
									</span>
								)}
							</Link>
						</Button>
						<Button variant="ghost" size="icon" aria-label="Account">
							<UserRound className="size-4" />
						</Button>
						{!currentUserName ? (
							<Button asChild className="hidden rounded-full px-5 sm:inline-flex">
							<Link to="/auth/sign-in">Sign In</Link>
						</Button>
						): (
							<DropdownMenu>
  <DropdownMenuTrigger asChild>
    
		<Avatar>
  <AvatarImage src="" />
  <AvatarFallback className="font-bold text-2xl">{currentUserName[0]}</AvatarFallback>
</Avatar>
	
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Orders</DropdownMenuItem>
	
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
      <DropdownMenuItem onClick={signout}>Sign Out</DropdownMenuItem>
	
   
  </DropdownMenuContent>
</DropdownMenu>

						)}
						
					</div>
				</div>

				<div className="hidden items-center justify-between gap-3 md:flex">
					<nav className="flex flex-wrap items-center gap-1">
						{navigationLinks.map((item) => (
							<Link
								key={item.label}
								to={item.to}
								{...("search" in item ? { search: item.search } : {})}
								className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
							>
								{item.label}
							</Link>
						))}
					</nav>

					<div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-2 text-xs text-muted-foreground">
						<span className="inline-flex size-2 rounded-full bg-emerald-500" />
						Secure checkout and instant order tracking
					</div>
				</div>

				<div className="grid gap-3 md:hidden">
					<div className="relative">
						<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search catalog"
							className="h-10 rounded-full border-border/70 bg-card pl-9"
						/>
					</div>
					<nav className="grid grid-cols-2 gap-2 sm:grid-cols-4">
						{navigationLinks.map((item) => (
							<Link
								key={item.label}
								to={item.to}
								{...("search" in item ? { search: item.search } : {})}
								className="rounded-full border border-border/70 bg-card px-3 py-2 text-center text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
							>
								{item.label}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
