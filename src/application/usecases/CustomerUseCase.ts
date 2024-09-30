import { ICustomerGateway } from "@gateways/ICustomerGateway";
import { Customer } from "@entities/Customer";
import { Campaign } from "@entities/Campaign";

export class CustomerUseCase {
	constructor(private readonly customerGateway: ICustomerGateway) { }

	async getAll(): Promise<Customer[]> {
		return await this.customerGateway.allCustomers();
	}

	async createCustomer(data: Partial<Customer>): Promise<Customer> {
		const { cpf, name, phoneNumber, email } = data;
		const customer = new Customer(cpf, name, phoneNumber, email);
		return await this.customerGateway.newCustomer(customer);
	}

	async getCustomerById(id: number): Promise<Customer | null> {
		const customers = await this.customerGateway.getCustomerById({ where: { id } });
		return customers.length ? customers[0] : null;
	}

	async searchCustomer(cpf: string): Promise<Customer | null> {
		return await this.customerGateway.searchCustomer(cpf);
	}

	async updateCustomer(id: number, data: Customer): Promise<[affectedCount: number]> {
		const customer = await this.getCustomerById(id);
		if (!customer) throw new Error("Customer not found");
		return await this.customerGateway.updateCustomer(id, data);
	}

	async deleteCustomer(id: number): Promise<number> {
		return await this.customerGateway.deleteCustomer(id);
	}

	async getCustomerCampaigns(id: string): Promise<Campaign[]> {
		return await this.customerGateway.campaignOfCustomers(id);
	}
}
