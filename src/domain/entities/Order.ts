export class Order {
	[x: string]: any;

	constructor(params: any) {
		if (params.id !== undefined) this.id = params.id;
		this.fk_idCustomer = params.fk_idCustomer;
		this.status = params.status;
		this.price = params.price;
	}

	id?: number;
	fk_idCustomer: number;
	status: string;
	price: string;
}
