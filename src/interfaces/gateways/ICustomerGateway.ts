import { Customer } from "@entities/Customer";

export interface ICustomerGateway {
	allCustomers(): Promise<Customer[]>;

	newCustomer(customer: Customer): Promise<Customer>;

	getCustomerById(condition?: any): Promise<Customer[]>;

	searchCustomer(cpf: string): Promise<Customer>;

	updateCustomer(
		id: number,
		customer: Customer
	): Promise<[affectedCount: number]>;

	deleteCustomer(id: number): Promise<number>;

	campaignOfCustomers(id: string): Promise<any[]>;
}
