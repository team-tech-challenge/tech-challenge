import { Order } from "@entities/Order";
import { OrderProduct } from "@entities/OrderProduct";
import { Product } from "@entities/Product";

export interface IOrderGateway {
	allOrders(params?): Promise<Order[]>;

	getOrderById(id: number): Promise<Order>;

	newOrder(order: Order): Promise<Order>;

	updateOrder(id: number, order: Order): Promise<void>;

	deleteOrder(id: number): Promise<number>;
	
	productsOfOrder(id: number): Promise<{ product: Product; comboId: number | null }[]>;

	updateOrderStatus(Order: Order, params: any);
	
	updateOrderTotalPrice(orderId: number, totalPrice: number);

	newProductAssociation(products: OrderProduct[]): Promise<any>;

	deleteProductOfOrder(orderId: number, productId: number | null, comboId: number | null): Promise<void>;

}
