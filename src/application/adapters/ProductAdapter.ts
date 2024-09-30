import { Product } from "@database/ProductModel";
import { IProductGateway } from "@gateways/IProductGateway";

export class ProductAdapter implements IProductGateway {
	allProducts(params?: any): Promise<Product[]> {
		return Product.findAll(params);
	}

	newProduct(values: any): Promise<Product> {
		return Product.create(values);
	}

	updateProduct(values: any, params: any): Promise<any> {
		return Product.update(values, params);
	}

	deleteProduct(params: any): Promise<number> {
		return Product.destroy(params);
	}
}
