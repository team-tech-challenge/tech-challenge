import { Customer } from "./Customer";

export class Campaign {
	private id?: number;
	private name: string;
	private endDate: Date;
	private campaignRule: string;
	private discount: number;
	private customers: Customer[];

	constructor(name: string, endDate: Date, campaignRule: string, discount: number, id?: number) {
		this.id = id;
		this.name = name;
		this.endDate = endDate;
		this.campaignRule = campaignRule;
		this.discount = discount;
	}

	public getId(): number | undefined {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public getEndDate(): Date {
		return this.endDate;
	}
	
	public getCampaignRule(): string {
		return this.campaignRule;
	}
	
	public getDiscount(): number {
		return this.discount;
	}

	getCustomers(): Customer[] {
		return this.customers;
	}
	
	addCustomer(customer: Customer): void {
		this.customers.push(customer);
	}	
}
