export class Product {
	id?: number;
	fk_idCategory: number;
	name: string;
	description: string;
	price: number;

	constructor(fk_idCategory: number, name: string, description: string, price: number, id?: number) {
		this.id = id;
		this.fk_idCategory = fk_idCategory;
		this.name = name;
		this.description = description;
		this.price = price;
	}
}
