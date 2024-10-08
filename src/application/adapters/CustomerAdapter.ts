import { ICustomerGateway } from "@gateways/ICustomerGateway";
import { Customer as CustomerModel } from "@database/CustomerModel";
import { CampaignCustomer as CampaignCustomerModel } from "@database/CampaignCustomerModel";
import { Customer } from "@entities/Customer";
import { CustomerMapper } from "@mappers/CustomerMapper";

export class CustomerAdapter implements ICustomerGateway {
    async allCustomers(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        return customerModels.map(model => CustomerMapper.toEntity(model));
    }
    
    async getCustomerById(id: number): Promise<Customer> {        
        const customerModel = await CustomerModel.findOne({ where: { id } });
        return CustomerMapper.toEntity(customerModel);
    }

    async newCustomer(customer: any): Promise<Customer> {
        const customerModel = await CustomerModel.create(customer);
        return CustomerMapper.toEntity(customerModel);
    }


    async searchCustomer(cpf: string): Promise<Customer> {
        const customerModel = await CustomerModel.findOne({
            where: { cpf }
        });
        if (!customerModel) throw new Error('Customer not found');
        return CustomerMapper.toEntity(customerModel);        
    }

    async updateCustomer(id: number, data: Customer): Promise<void> {
		
        const existingCustomer = await CustomerModel.findOne({ where: { id } });

        if (!existingCustomer) {
            throw new Error("Customer not found");
        }
		
        try {
            await CustomerModel.update(data, {
                where: { id }
            });
        } catch (error) {
            console.error(error);
			throw new Error("Customer not updated");
        }		
    }

    async deleteCustomer(id: number): Promise<void> {
        try {
            await CustomerModel.destroy({
                where: { id }
            });
        } catch (error) {
            console.error(error);
			throw new Error("Customer not delete");
        }

               
    }

    async campaignOfCustomers(customerId: number): Promise<any[]> {
        // Assuming CampaignCustomer model for the relationship
        const campaignCustomers = await CampaignCustomerModel.findAll({
            where: { customerId: customerId }
        });
        return campaignCustomers.map(campaignCustomer => campaignCustomer.toJSON());
    }    
}