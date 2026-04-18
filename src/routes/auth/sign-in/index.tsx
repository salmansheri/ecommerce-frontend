import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Sparkles, Truck } from "lucide-react";
import { SignInForm } from "@/components/sign-in-form";

export const Route = createFileRoute("/auth/sign-in/")({
	component: SignInPage,
});

function SignInPage() {
	return (
		<section className="relative isolate overflow-hidden px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-300/20 blur-3xl" />
				<div className="absolute -left-16 bottom-10 h-72 w-72 rounded-full bg-rose-300/15 blur-3xl" />
			</div>

			<div className="mx-auto grid min-h-[calc(100dvh-13rem)] max-w-6xl items-center gap-8 md:min-h-[calc(100dvh-10rem)] lg:grid-cols-2 lg:gap-10">
				<div className="space-y-6">
					<div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
						<Sparkles className="size-3.5" />
						Secure and fast checkout journey
					</div>
					<h1 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
						Welcome back to your premium shopping space.
					</h1>
					<p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
						Sign in to track orders in real-time, save favorite products, and
						discover member-only offers curated for you.
					</p>
					<div className="grid gap-3 sm:grid-cols-3">
						<div className="rounded-2xl border border-border/70 bg-card/80 p-3 text-sm text-muted-foreground">
							<ShieldCheck className="mb-2 size-4 text-foreground" />
							Protected login
						</div>
						<div className="rounded-2xl border border-border/70 bg-card/80 p-3 text-sm text-muted-foreground">
							<Truck className="mb-2 size-4 text-foreground" />
							Live delivery status
						</div>
						<div className="rounded-2xl border border-border/70 bg-card/80 p-3 text-sm text-muted-foreground">
							<Sparkles className="mb-2 size-4 text-foreground" />
							Personalized deals
						</div>
					</div>
				</div>

				<div className="w-full">
					<SignInForm />
				</div>
			</div>
		</section>
	);
}
