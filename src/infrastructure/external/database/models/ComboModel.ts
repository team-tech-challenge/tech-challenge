import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({
	timestamps: true,
	tableName: "combo",
	modelName: "Combo",
})
export class Combo extends Model {
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
	declare name: string;

	@Column({
		type: DataType.FLOAT,
	})
	declare discount: number;

}


