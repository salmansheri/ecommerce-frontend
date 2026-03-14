import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import type { TProduct } from "@/lib/data/product";
import { formatNumberToCurrency, formatNumberToPercentage } from "@/lib/utils";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

interface IProductCardProps {
	product: TProduct;
}
function ProductCard({ product }: IProductCardProps) {
	const isAvailable = product.quantity && Number(product.quantity) > 0;
	return (
		<Card className="">
			<CardHeader>
				<img className="w-full" src={product.imageUrl} alt={product.name} />
			</CardHeader>
			<CardContent>
				<div className="space-y-5">
					<div>
						<Link
							to="/product/$productId"
							params={{ productId: product.productId.toString() }}
							className="hover:underline transition-all  ease-in-out duration-300 delay-300"
						>
							<CardTitle>{product.name}</CardTitle>
						</Link>
					</div>

					<CardDescription className="text-left">
						{product.description}
					</CardDescription>
					
				</div>
			</CardContent>
			<CardFooter className="flex items-center justify-between">
				<div className="flex flex-col items-center justify-between">
					{/* <span className="text-neutral-100/50">
							{formatNumberToPercentage(product.discount)} Off
						</span> */}
						<span className="font-bold">
							{formatNumberToCurrency(product.price)}
						</span>
						
					</div>
				<Button disabled={!isAvailable} variant="outline">
					{isAvailable ? (
						<>
							<ShoppingCart />
							Add to Cart
						</>
					) : (
						"Stock Out"
					)}
				</Button>
			</CardFooter>
		</Card>
	);
}

export default ProductCard;
