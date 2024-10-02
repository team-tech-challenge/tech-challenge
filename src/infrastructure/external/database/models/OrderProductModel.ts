import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
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
		allowNull: true,
	})
	observation: string;

	@ForeignKey(() => Order)
	@Column({		
		type: DataType.INTEGER,
	})
	declare orderId: number;

	@ForeignKey(() => Combo)
	@Column({		
		type: DataType.INTEGER,
		allowNull: true,
	})
	declare comboId: number;

	@ForeignKey(() => Product)
	@Column({		
		type: DataType.INTEGER,
	})
	declare productId: number;

	// Relacionamento de Muitos para Um com Order
	@BelongsTo(() => Order)
	order: Order;

	// Relacionamento de Muitos para Um com Product
	@BelongsTo(() => Product)
	product: Product;

	// Relacionamento de Muitos para Um com Combo
	@BelongsTo(() => Combo)
	combo: Combo;

}
