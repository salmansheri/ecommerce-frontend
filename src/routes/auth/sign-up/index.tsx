import { createFileRoute } from "@tanstack/react-router";
import { Gift, Shield, Star } from "lucide-react";
import { SignupForm } from "@/components/signup-form";

export const Route = createFileRoute("/auth/sign-up/")({
	component: SignUpPage,
});

function SignUpPage() {
	return (
		<section className="relative isolate overflow-hidden px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute right-0 top-8 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
				<div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-cyan-300/15 blur-3xl" />
			</div>

			<div className="mx-auto grid min-h-[calc(100dvh-13rem)] max-w-6xl items-center gap-8 md:min-h-[calc(100dvh-10rem)] lg:grid-cols-2 lg:gap-10">
				<div className="order-2 lg:order-1">
					<SignupForm />
				</div>

				<div className="order-1 space-y-6 lg:order-2 lg:pl-6">
					<div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
						<Star className="size-3.5" />
						Join over 10,000 happy shoppers
					</div>
					<h1 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
						Create your account and unlock smarter shopping.
					</h1>
					<p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
						Save your favorites, get faster checkout, and receive exclusive
						offers made for your style and budget.
					</p>
					<div className="grid gap-3 sm:grid-cols-3">
						<div className="rounded-2xl border border-border/70 bg-card/80 p-3 text-sm text-muted-foreground">
							<Gift className="mb-2 size-4 text-foreground" />
							New member rewards
						</div>
						<div className="rounded-2xl border border-border/70 bg-card/80 p-3 text-sm text-muted-foreground">
							<Shield className="mb-2 size-4 text-foreground" />
							Private account security
						</div>
						<div className="rounded-2xl border border-border/70 bg-card/80 p-3 text-sm text-muted-foreground">
							<Star className="mb-2 size-4 text-foreground" />
							Curated recommendations
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
