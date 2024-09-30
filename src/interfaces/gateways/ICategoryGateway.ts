import { Category } from "@entities/Category";

export interface ICategoryGateway {
	allCategories(): Promise<Category[]>;

	newCategory(category: Category): Promise<Category>;
}
