import { ICustomerGateway } from "@gateways/ICustomerGateway";
import { Customer } from "@database/CustomerModel";
import { CampaignCustomer } from "@database/CampaignCustomerModel";
import { Campaign } from "@database/CampaignModel";
import { Op } from "sequelize";

export class CustomerAdapter implements ICustomerGateway {
	allCustomers(): Promise<Customer[]> {
		return Customer.findAll();
	}

	newCustomer(values: any): Promise<Customer> {
		return Customer.create(values);
	}

	getCustomerById(params?: any): Promise<Customer[]> {
		return Customer.findAll(params);
	}

	searchCustomer(cpf: string): Promise<Customer> {
		return Customer.findOne({ where: { cpf } });
	}

	updateCustomer(id: number, values: any): Promise<[affectedCount: number]> {
		return Customer.update(values, { where: { id } });
	}

	deleteCustomer(id: number): Promise<number> {
		return Customer.destroy({ where: { id } });
	}

	campaignOfCustomers(id: string): Promise<CampaignCustomer[]> {
		return CampaignCustomer.findAll({
			where: { fk_idCustomer: id },
			include:[
				{
					model:Campaign,
					on: {
						"$campaign.id$": {
							[Op.col]: "CampaignCustomer.fk_idCampaign",
						},
					},
				},
				{
					model:Customer,
					on: {
						"$customer.id$": {
							[Op.col]: "CampaignCustomer.fk_idCustomer",
						},
					},

				}
			]
		});
	}
}
