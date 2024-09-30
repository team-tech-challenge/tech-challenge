import { Order } from "@entities/Order";

export interface IOrderGateway {
	allOrders(params?): Promise<Order[]>;

	getOrderById(condition?: any): Promise<Order[]>;

	newOrder(Order: Order): Promise<Order>;

	updateOrder(Order: Order, params: any): Promise<[affectedCount: number]>;

	deleteOrder(params: any): Promise<number>;

	newProductAssociation(values: any): Promise<any>;

	productsOfOrder(id: string): Promise<any[]>;

	updateOrderStatus(Order: Order, params: any);

	deleteProductOfOrder(params: any): Promise<number>;

}
