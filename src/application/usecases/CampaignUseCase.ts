import { ICampaignGateway } from "@gateways/ICampaignGateway";
import { Campaign } from "@entities/Campaign";

export class CampaignUseCase {
	constructor(private readonly campaignGateway: ICampaignGateway) { }

	async getAll(): Promise<Campaign[]> {
		return await this.campaignGateway.allCampaigns();
	}

	async getCampaignById(id: number): Promise<Campaign | null> {
		const campaigns = await this.campaignGateway.getCampaignById({ where: { id } });
		return campaigns.length ? campaigns[0] : null;
	}

	async createCampaign(data: Partial<Campaign>): Promise<Campaign> {
		const { name, endDate, campaignRule, discount } = data;
		const campaign = new Campaign(name, new Date(endDate), campaignRule, discount);
		return await this.campaignGateway.newCampaign(campaign);
	}

	async createCampaignCustomerAssociation(data: any): Promise<any> {
		return await this.campaignGateway.newCampaignAssociation(data);
	}

	async updateCampaign(id: number, data: Campaign): Promise<[affectedCount: number]> {
		const campaign = await this.getCampaignById(id);
		if (!campaign) throw new Error("Campaign not found");
		return await this.campaignGateway.updateCampaign(id, data);
	}

	async getCampaignCustomers(id: string): Promise<any[]> {
		return await this.campaignGateway.customersOfCampaign(id);
	}
}
