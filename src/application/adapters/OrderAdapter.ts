import { Op } from "sequelize";
import { OrderProduct } from "@database/OrderProductModel";
import { Product } from "@database/ProductModel";
import { Order } from "@database/OrderModel";
import { IOrderGateway } from "@gateways/IOrderGateway";

export class OrderAdapter implements IOrderGateway {
	allOrders(params?: any): Promise<Order[]> {
		return Order.findAll(params);
	}

	getOrderById(params?: any): Promise<Order[]> {
		return Order.findAll(params);
	}

	newOrder(values: any): Promise<Order> {
		return Order.create(values);
	}

	updateOrder(values: any, params: any): Promise<any> {
		return Order.update(values, params);
	}

	deleteOrder(params: any): Promise<number> {
		return Order.destroy(params);
	}

	newProductAssociation(values: any): Promise<OrderProduct> {
		return OrderProduct.create(values);
	}

	productsOfOrder(id: string): Promise<OrderProduct[]> {
		return OrderProduct.findAll({
			attributes: ["observation", "fk_idCombo"],
			include: [
				{
					model: Product,
					on: {
						"$product.id$": {
							[Op.col]: "OrderProduct.fk_idProduct",
						},
					},
				},
				{
					model: Order,
					on: {
						"$order.id$": {
							[Op.col]: "OrderProduct.fk_idOrder",
						},
					},
				},
			],
			where: { fk_idOrder: id },
		});
	}

	updateOrderStatus(values: any, params: any): Promise<any> {
		return Order.update(values, params);
	}

	deleteProductOfOrder(params: any): Promise<number> {
		return OrderProduct.destroy(params);
	}
}
