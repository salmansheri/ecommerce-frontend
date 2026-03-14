import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatNumberToCurrency(num: number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "INR",
	}).format(num);
}

export function formatNumberToPercentage(num: number) {
  return new Intl.NumberFormat("en-US", {
		style: "percent",
    maximumFractionDigits: 2,
		
	}).format(num/100);

}

export const API_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8080/api/v1";
