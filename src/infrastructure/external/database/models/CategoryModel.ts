import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({
	timestamps: true,
	tableName: "category",
	modelName: "Category",
})
export class Category extends Model {
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
	name: string;
}
