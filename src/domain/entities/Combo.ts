export class Combo {
	id?: number;
	name: string;
	discount: number;

	constructor(name: string, discount: number, id?: number) {
		this.id = id;
		this.name = name;
		this.discount = discount;
	}
}
