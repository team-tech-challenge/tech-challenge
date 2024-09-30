export class Payment {
	id?: number;
	paymentMethod: string;
	paymentCode: string;
	status: string;
	fk_idOrder: number;

	constructor(paymentMethod: string, paymentCode: string, status: string, fk_idOrder: number, id?: number) {
		this.id = id;
		this.paymentMethod = paymentMethod;
		this.paymentCode = paymentCode;
		this.status = status;
		this.fk_idOrder = fk_idOrder;
	}
}
