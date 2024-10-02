import { Table, Column, DataType, Model, BelongsTo, HasMany, ForeignKey  } from "sequelize-typescript";
import { Customer } from "@database/CustomerModel";
import { Campaign } from "@database/CampaignModel";
import { Payment } from "@database/PaymentModel";
import { OrderProduct } from "@database/OrderProductModel";

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

	// Chave estrangeira para Customer	
	@ForeignKey(() => Customer)
	@Column({		
		type: DataType.INTEGER,
		allowNull: true,
	})
	declare customerId: number;

	// Chave estrangeira para Campaign	
	@ForeignKey(() => Campaign)
	@Column({		
		type: DataType.INTEGER,
		allowNull: true,
	})
	declare campaignId: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	status: string;

	@Column({
		type: DataType.FLOAT,
		allowNull: false,
	})
	price: number;

	// Relacionamento com Customer (Muitos para Um)
	@BelongsTo(() => Customer)
	customer: Customer;

	// Relacionamento com Campaign (Muitos para Um)
	@BelongsTo(() => Campaign)
	campaign: Campaign;

	// Relacionamento de Um para Muitos com Payment
	@HasMany(() => Payment)
	payments: Payment[];

	// Relacionamento de Um para Muitos com OrderProduct
	@HasMany(() => OrderProduct)
	orderproduct: OrderProduct[];
}
