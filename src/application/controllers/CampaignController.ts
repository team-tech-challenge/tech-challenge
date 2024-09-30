import { CampaignUseCase } from "@usecases/CampaignUseCase";
import { defaultReturnStatement, formatObjectResponse } from "@utils/http";

export class CampaignController {
	constructor(private campaignUseCase: CampaignUseCase) { }

	async getAll(req, res) {
		try {
			const campaigns = await this.campaignUseCase.getAll();
			defaultReturnStatement(res, "Campaigns", campaigns);
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}

	async getCampaignById(req, res) {
		try {
			const campaignId = req.params.Id;
			const campaign = await this.campaignUseCase.getCampaignById(campaignId);
			defaultReturnStatement(res, "Campaign", campaign);
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}

	async createCampaign(req, res) {
		try {
			const campaign = await this.campaignUseCase.createCampaign({ ...req.body });
			defaultReturnStatement(res, "Campaign Created", campaign);
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}

	async createCampaignCustomerAssociation(req, res) {
		try {
			const association = await this.campaignUseCase.createCampaignCustomerAssociation({ ...req.body });
			defaultReturnStatement(res, "Customer Association Created", association);
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}

	async updateCampaign(req, res) {
		try {
			const campaign = await this.campaignUseCase.updateCampaign(req.params.id, { ...req.body });
			defaultReturnStatement(res, "Campaign Updated", campaign);
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}

	async getCampaignCustomers(req, res) {
		try {
			const campaignId = req.params.id;
			const customers = await this.campaignUseCase.getCampaignCustomers(campaignId);
			res.json({
				status: 200,
				Customers: formatObjectResponse(customers, "customer"),
			});
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}
}
