
import { Table, Column, DataType, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Order } from "@database/OrderModel";

@Table({
	timestamps: true,
	tableName: "payment",
	modelName: "Payment",
})
export class Payment extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	paymentMethod: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	paymentCode: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	status: string;

	@ForeignKey(() => Order)
	@Column({		
		type: DataType.INTEGER,
		allowNull: false,
	})
	orderId: number;

	// Relacionamento de Muitos para Um com Order
	@BelongsTo(() => Order)
	order: Order;
}
