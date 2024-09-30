export class Employee {
	id?: number;
	cpf: string;
	name: string;
	username: string;
	password: string;

	constructor(cpf: string, name: string, username: string, password: string, id?: number) {
		this.id = id;
		this.cpf = cpf;
		this.name = name;
		this.username = username;
		this.password = password;
	}
}
