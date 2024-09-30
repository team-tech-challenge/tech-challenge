import { ForeignKey, NonAttribute } from "sequelize";
import { Table, Column, DataType, Model, HasMany } from "sequelize-typescript";
import { Campaign } from "@database/CampaignModel";
import { Customer } from "@database/CustomerModel";

@Table({
	timestamps: true,
	tableName: "campaign_customer",
	modelName: "CampaignCustomer",
})
export class CampaignCustomer extends Model {
	@Column({
		type: DataType.INTEGER,
	})
	declare fk_idCampaign: ForeignKey<Campaign["id"]>;

	@Column({
		type: DataType.INTEGER,
	})
	declare fk_idCustomer: ForeignKey<Customer["id"]>;

	@HasMany(() => Campaign, {
		foreignKey: 'fk_idCampaign',
	})
	declare campaign?: NonAttribute<Campaign[]>;

	@HasMany(() => Customer, {
		foreignKey: 'fk_idCustomer',
	})
	declare customer?: NonAttribute<Customer[]>;

}
