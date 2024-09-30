import { ForeignKey, NonAttribute } from "sequelize";
import { Table, Column, DataType, Model, HasMany } from "sequelize-typescript";
import { Order } from "@database/OrderModel";
import { Product } from "@database/ProductModel";
import { Combo } from "@database/ComboModel";
@Table({
	timestamps: true,
	tableName: "order_product",
	modelName: "OrderProduct",
})
export class OrderProduct extends Model {
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	observation: string;

	@Column({
		type: DataType.INTEGER,
	})
	declare fk_idOrder: ForeignKey<Order["id"]>;

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	declare fk_idCombo: ForeignKey<Combo["id"]>;

	@Column({
		type: DataType.INTEGER,
	})
	declare fk_idProduct: ForeignKey<Product["id"]>;

	@HasMany(() => Order, {foreignKey: 'fk_idOrder'})
  	declare order?: NonAttribute<Order[]>;

	@HasMany(() => Product, {foreignKey: 'fk_idProduct'})
  	declare product?: NonAttribute<Product[]>;

}
