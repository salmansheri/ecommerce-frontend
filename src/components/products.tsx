import { ProductDto } from "@/generated"
import ProductCard from "./productCard"

interface ProductsProps {
    products: ProductDto[]
}

const Products = ({products}: ProductsProps) => {
    if (products.length === 0) {
        return (
            <div className="flex items-center justify-center font-bold text-2xl">
                No products Found!
            </div>
        )
    }
    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                                    
                                    {products?.map((product) => (
                                        <ProductCard key={product.productId} product={product} />
                                    ))}
                                </div>
    )
}

export default Products; 
