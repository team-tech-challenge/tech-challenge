import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Combo } from "@database/ComboModel";
import { ForeignKey, NonAttribute } from "sequelize";
import { Product } from "@database/ProductModel";

@Table({
	timestamps: true,
	tableName: "combo_product",
	modelName: "ComboProduct",
})
export class ComboProduct extends Model {

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	declare fk_idCombo: ForeignKey<Combo["id"]>;

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	declare fk_idProduct: ForeignKey<Product["id"]>;

	@HasMany(() => Combo, {
		foreignKey: 'fk_idCombo',
	})
	declare combo?: NonAttribute<Combo[]>;

	@HasMany(() => Product, {
		foreignKey: 'fk_idProduct'
	})
	declare product?: NonAttribute<Product[]>;

}
