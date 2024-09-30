import { ICategoryGateway } from "@gateways/ICategoryGateway";
import { Category } from "@database/CategoryModel";

export class CategoryAdapter implements ICategoryGateway {
	allCategories(): Promise<Category[]> {
		return Category.findAll();
	}

	newCategory(values: any): Promise<Category> {
		return Category.create(values);
	}
}
