import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordInputProps
	extends Omit<React.ComponentProps<"input">, "type"> {
	label?: string;
	description?: string;
	error?: string;
}

export const PasswordInput = ({
	className,
	label,
	description,
	error,
	id,
	...props
}: PasswordInputProps) => {
	const [showPassword, setShowPassword] = React.useState(false);
	const generatedId = React.useId();
	const inputId = id ?? generatedId;

	return (
		<div className="flex flex-col gap-1.5">
			{label && (
				<label
					htmlFor={inputId}
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					{label}
				</label>
			)}
			<div className="relative">
				<Input
					id={inputId}
					type={showPassword ? "text" : "password"}
					className={cn(
						"pr-10",
						error && "border-destructive focus-visible:ring-destructive/20",
					)}
					{...props}
				/>
				<Button
					type="button"
					variant="ghost"
					size="icon-xs"
					className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent focus-visible:bg-transparent"
					onClick={() => setShowPassword((prev) => !prev)}
					aria-label={showPassword ? "Hide password" : "Show password"}
				>
					{showPassword ? (
						<EyeOffIcon className="h-4 w-4 text-muted-foreground" />
					) : (
						<EyeIcon className="h-4 w-4 text-muted-foreground" />
					)}
				</Button>
			</div>
			{description && !error && (
				<p className="text-sm text-muted-foreground">{description}</p>
			)}
			{error && <p className="text-sm text-destructive">{error}</p>}
		</div>
	);
};
