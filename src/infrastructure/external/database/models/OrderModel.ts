import { ForeignKey } from "sequelize";
import { Table, Column, DataType, Model } from "sequelize-typescript";
import { Customer } from "@database/CustomerModel";
import { Campaign } from "@database/CampaignModel";

@Table({
	timestamps: true,
	tableName: "order",
	modelName: "Order",
})
export class Order extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@Column({
		type: DataType.INTEGER,
	})
	declare fk_idCustomer: ForeignKey<Customer["id"]>;

	@Column({
		type: DataType.INTEGER,
	})
	declare fk_idCampaign: ForeignKey<Campaign["id"]>;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	status: string;

	@Column({
		type: DataType.FLOAT,
		allowNull: false,
	})
	price: string;
}
