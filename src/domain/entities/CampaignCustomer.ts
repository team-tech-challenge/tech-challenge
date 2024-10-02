import { Customer } from "./Customer";

export class CampaignCustomer {
    private campaignId: number;
    private customerId: number;
    private customer: Customer | null;

    constructor(campaignId: number, customerId: number, customer: Customer | null) {
        this.campaignId = campaignId;
        this.customerId = customerId;
        this.customer = customer;
    }

    // Getters
    getCampaignId(): number {
        return this.campaignId;
    }

    getCustomerId(): number {
        return this.customerId;
    }

    getCustomer(): Customer | null {
        return this.customer;
    }
    
}