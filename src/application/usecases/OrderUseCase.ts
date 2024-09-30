import { IOrderGateway } from "@gateways/IOrderGateway";
import { ICustomerGateway } from "@gateways/ICustomerGateway";
import { IComboGateway } from "@gateways/IComboGateway";
import { ICampaignGateway } from "@gateways/ICampaignGateway";
import { Order } from "@entities/Order";
import { Op } from "sequelize";

export class OrderUseCase {
	constructor(
		private readonly orderGateway: IOrderGateway,
		private readonly customerGateway: ICustomerGateway,
		private readonly comboGateway: IComboGateway,
		private readonly campaignGateway: ICampaignGateway
	) { }

	async getAll(): Promise<Order[]> {
		return await this.orderGateway.allOrders();
	}

	async getOrderById(orderId: string): Promise<any> {
		return await this.orderGateway.getOrderById({ where: { id: orderId } });
	}

	async createOrder(orderData: any): Promise<Order> {
		let fk_idCampaign = null;
		const { fk_idCustomer } = orderData;

		if (fk_idCustomer != null) {
			const campaign = await this.customerGateway.campaignOfCustomers(fk_idCustomer);
			const resultCampaign = campaign[0];
			if (resultCampaign) {
				fk_idCampaign = resultCampaign["fk_idCampaign"];
			}
		}

		return await this.orderGateway.newOrder({ ...orderData, fk_idCampaign });
	}

	async updateOrder(orderData: any): Promise<number> {
		const { id, fk_idCustomer, status, price } = orderData;
		if (!id) throw new Error("Missing required field: id");

		const [updatedCount] = await this.orderGateway.updateOrder(
			{ fk_idCustomer, status, price },
			{ where: { id } }
		);

		return updatedCount;
	}

	async deleteOrder(orderId: string): Promise<number> {
		return await this.orderGateway.deleteOrder({ where: { id: orderId } });
	}

	async createOrderProductAssociation(orderProductData: any): Promise<void> {
		const { fk_idOrder, combos, products, observation } = orderProductData;

		if (!fk_idOrder) throw new Error("Missing required field: fk_idOrder");
		if (!combos && !products) throw new Error("No products registered in the order");

		const order = await this.orderGateway.getOrderById({ where: { id: fk_idOrder } });
		if (!order || order.length == 0) throw new Error("Order not found");
		if (order[0].dataValues.status != 'Created') throw new Error("Order cannot be changed");

		if (combos) {
			for (const combo of combos) {
				const fk_idCombo = combo.fk_idCombo;
				const resultProducts = await this.comboGateway.productsOfCombo(fk_idCombo);
				for (const result of resultProducts) {
					const fk_idProduct = result.dataValues.fk_idProduct;
					if (fk_idProduct != null) {
						await this.orderGateway.newProductAssociation({
							fk_idOrder,
							fk_idCombo,
							fk_idProduct,
							observation,
						});
					}
				}
			}
		}

		if (products) {
			for (const product of products) {
				const fk_idProduct = product.fk_idProduct;
				if (fk_idProduct != null) {
					await this.orderGateway.newProductAssociation({
						fk_idOrder,
						fk_idProduct,
						observation,
					});
				}
			}
		}

		await this.updateOrderPrice(fk_idOrder);
	}

	async deleteOrderProductAssociation(orderProductData: any): Promise<void> {
		const { fk_idOrder, combos, products } = orderProductData;

		if (!fk_idOrder) throw new Error("Missing required field: fk_idOrder");
		if (!combos && !products) throw new Error("No products registered in the order");

		const order = await this.orderGateway.getOrderById({ where: { id: fk_idOrder } });
		if (!order || order.length == 0) throw new Error("Order not found");
		if (order[0].dataValues.status != 'Created') throw new Error("Order cannot be changed");

		if (combos) {
			for (const combo of combos) {
				const fk_idCombo = combo.fk_idCombo;
				const resultProducts = await this.comboGateway.productsOfCombo(fk_idCombo);
				for (const result of resultProducts) {
					const fk_idProduct = result.dataValues.fk_idProduct;
					if (fk_idProduct != null) {
						await this.orderGateway.deleteProductOfOrder({
							where: { fk_idOrder, fk_idCombo, fk_idProduct },
						});
					}
				}
			}
		}

		if (products) {
			for (const product of products) {
				const fk_idProduct = product.fk_idProduct;
				if (fk_idProduct != null) {
					await this.orderGateway.deleteProductOfOrder({
						where: {
							fk_idOrder,
							fk_idProduct,
							fk_idCombo: { [Op.is]: null },
						},
					});
				}
			}
		}

		await this.updateOrderPrice(fk_idOrder);
	}

	async getOrderProducts(orderID: string): Promise<any> {
		return await this.orderGateway.productsOfOrder(orderID);
	}

	async updateOrderPrice(id: string): Promise<void> {
		let orderPrice = 0;

		const order = await this.orderGateway.getOrderById({ where: { id } });
		if (!order || order.length == 0) return;
		if (order[0].dataValues.status != 'Created') return;

		const products = await this.orderGateway.productsOfOrder(id);
		for (const product of products) {
			const productsOrder = product.dataValues.product;
			let discount = 0;
			if (product.dataValues.fk_idCombo) {
				const resultCombo = await this.comboGateway.getComboById({ where: { id: product.dataValues.fk_idCombo } });
				if (resultCombo[0].discount) {
					discount = resultCombo[0].discount;
				}
			}
			for (const productDetail of productsOrder) {
				orderPrice += productDetail.dataValues.price - (productDetail.dataValues.price * discount);
			}
		}

		if (order[0].dataValues.fk_idCampaign) {
			const campaign = await this.campaignGateway.getCampaignById(order[0].dataValues.fk_idCampaign);
			orderPrice -= orderPrice * campaign[0].discount;

			const orderUpdated = new Order(order[0]);
			orderUpdated.price = orderPrice.toString();

			await this.orderGateway.updateOrder(orderUpdated, { where: { id } });
		}
	}

	async updateOrderStatus(orderData: any): Promise<number> {
		const { id, fk_idCustomer, status, price } = orderData;
		if (!id) throw new Error("Missing required field: id");

		const [updatedCount] = await this.orderGateway.updateOrderStatus(
			{ fk_idCustomer, status: "Received", price },
			{ where: { id } }
		);

		return updatedCount;
	}

	async getOrderByStatus(orderStatus: string): Promise<any[]> {
		const result = await this.orderGateway.allOrders({
			where: { status: orderStatus },
			order: [["updatedAt", "ASC"]],
		});

		return result.map((order) => {
			const timeValue = new Date().getMinutes() - new Date(order["updatedAt"]).getMinutes();
			return {
				id: order.id,
				status: order.status,
				timeQueue: `${timeValue} Minutes`,
			};
		});
	}
}
