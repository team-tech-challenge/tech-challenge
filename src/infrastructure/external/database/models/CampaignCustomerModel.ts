import { Table, Column, DataType, Model, BelongsTo, ForeignKey} from "sequelize-typescript";
import { Campaign } from "@database/CampaignModel";
import { Customer } from "@database/CustomerModel";

@Table({
	timestamps: true,
	tableName: "campaign_customer",
	modelName: "CampaignCustomer",
})
export class CampaignCustomer extends Model {
	
	@ForeignKey(() => Campaign)
	@Column({		
		type: DataType.INTEGER,
	})
	declare campaignId: number;

	@ForeignKey(() => Customer)
	@Column({		
		type: DataType.INTEGER,
	})
	declare customerId: number;

	// Relacionamento de Muitos para Um com Campaign
	@BelongsTo(() => Campaign)
	campaign: Campaign;
	
	// Relacionamento de Muitos para Um com Customer
	@BelongsTo(() => Customer)
	customer: Customer;

}
