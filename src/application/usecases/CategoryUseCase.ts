import { ICategoryGateway } from "@gateways/ICategoryGateway";
import { Category } from "@entities/Category";

export class CategoryUseCase {
	constructor(private readonly categoryGateway: ICategoryGateway) { }

	async getAll(): Promise<Category[]> {
		return await this.categoryGateway.allCategories();
	}

	async createCategory(data: Partial<Category>): Promise<Category> {
		const { name } = data;
		const category = new Category(name);
		return await this.categoryGateway.newCategory(category);
	}
}
