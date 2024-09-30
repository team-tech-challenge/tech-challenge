import { Campaign } from "@entities/Campaign";

export interface ICampaignGateway {
	allCampaigns(): Promise<Campaign[]>;

	getCampaignById(condition?: any): Promise<Campaign[]>;

	newCampaign(campaign: Campaign): Promise<Campaign>;

	newCampaignAssociation(values: any): Promise<any>;

	updateCampaign(
		id: number,
		campaign: Campaign
	): Promise<[affectedCount: number]>;

	customersOfCampaign(id: string): Promise<any[]>;
}
