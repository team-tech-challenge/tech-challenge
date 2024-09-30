export class Campaign {
	id?: number;
	name: string;
	endDate: Date;
	campaignRule: string;
	discount: number;

	constructor(name: string, endDate: Date, campaignRule: string, discount: number, id?: number) {
		this.id = id;
		this.name = name;
		this.endDate = endDate;
		this.campaignRule = campaignRule;
		this.discount = discount;
	}
}
