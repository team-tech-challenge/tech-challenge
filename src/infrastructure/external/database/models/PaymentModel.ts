import { Table, Column, DataType, Model } from "sequelize-typescript";

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

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	fk_idOrder: number;
}
