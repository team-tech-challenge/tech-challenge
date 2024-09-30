export class Customer {
	id?: number;
	cpf: string;
	name: string;
	phoneNumber: string;
	email: string;

	constructor(cpf: string, name: string, phoneNumber: string, email: string, id?: number) {
		this.id = id;
		this.cpf = cpf;
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.email = email;
	}
}
