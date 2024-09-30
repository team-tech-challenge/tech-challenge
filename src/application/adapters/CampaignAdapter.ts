import { Campaign } from "@database/CampaignModel";
import { Customer } from "@database/CustomerModel";
import { CampaignCustomer } from "@database/CampaignCustomerModel";
import { ICampaignGateway } from "@gateways/ICampaignGateway";
import { Op } from "sequelize";

export class CampaignAdapter implements ICampaignGateway {
	allCampaigns(): Promise<Campaign[]> {
		return Campaign.findAll();
	}

	getCampaignById(params?: any): Promise<Campaign[]> {
		return Campaign.findAll(params);
	}

	newCampaign(values: any): Promise<Campaign> {
		return Campaign.create(values);
	}

	newCampaignAssociation(values: any): Promise<CampaignCustomer> {
		return CampaignCustomer.create(values);
	}

	updateCampaign(id: number, values: any): Promise<[affectedCount: number]> {
		return Campaign.update(values, { where: { id } });
	}

	customersOfCampaign(id: string): Promise<CampaignCustomer[]> {
		return CampaignCustomer.findAll({
			where: { fk_idCampaign: id },
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
			],
			order: [['id', 'DESC']],
			limit : 1,
		});
	}
}
