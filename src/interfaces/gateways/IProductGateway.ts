import { Product } from "@entities/Product";

export interface IProductGateway {
	allProducts(condition?: any): Promise<Product[]>;

	newProduct(product: Product): Promise<Product>;

	updateProduct(
		product: Product,
		params: any
	): Promise<[affectedCount: number]>;

	deleteProduct(params: any): Promise<number>;
}
