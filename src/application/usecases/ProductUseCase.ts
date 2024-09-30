import { IProductGateway } from "@gateways/IProductGateway";
import { Product } from "@entities/Product";

export class ProductUseCase {
	constructor(private readonly productGateway: IProductGateway) { }

	async getAll(): Promise<any> {
		return await this.productGateway.allProducts();
	}

	async getProductByCategory(categoryId: string): Promise<any> {
		return await this.productGateway.allProducts({
			where: { fk_idCategory: categoryId },
		});
	}

	async createProduct(data: Partial<Product>): Promise<Product> {
		const { fk_idCategory, name, description, price } = data;
		const product = new Product(fk_idCategory, name, description, price);
		return await this.productGateway.newProduct(product);
	}

	async updateProduct(id: number, productData: Product): Promise<any> {
		const { name, price, description, fk_idCategory } = productData;
		if (!id) throw new Error("Missing required field: id");

		const [updatedCount] = await this.productGateway.updateProduct(
			{
				name,
				price,
				description,
				fk_idCategory,
			},
			{
				where: { id },
			}
		);

		if (updatedCount === 0) throw new Error("Product not found");

		return "Product updated successfully";
	}

	async deleteProduct(productId: string): Promise<number> {
		if (!productId) throw new Error("Missing required parameter: id");

		const deletedCount = await this.productGateway.deleteProduct({
			where: { id: productId },
		});

		if (deletedCount === 0) throw new Error("Product not found");

		return deletedCount;
	}
}
