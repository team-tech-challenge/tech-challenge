import { IOrderGateway } from "@gateways/IOrderGateway";
import { ICustomerGateway } from "@gateways/ICustomerGateway";
import { IComboGateway } from "@gateways/IComboGateway";
import { ICampaignGateway } from "@gateways/ICampaignGateway";
import { IProductGateway } from "@gateways/IProductGateway";
import { Order } from "@entities/Order";
import { OrderProduct } from "@entities/OrderProduct";
import { Product } from "@entities/Product";
import { OrderMapper } from "@mappers/OrderMapper";
import { differenceInSeconds } from 'date-fns';

export class OrderUseCase {
	constructor(
		private readonly orderGateway: IOrderGateway,
		private readonly customerGateway: ICustomerGateway,
		private readonly comboGateway: IComboGateway,
		private readonly campaignGateway: ICampaignGateway,
		private readonly productGateway: IProductGateway
	) { }

	async getAll(): Promise<Order[]> {
		const validStatuses = ["Created", "Processed", "Shipped", "Delivered", "Cancelled", "Waiting Payment"];

		const orders = await this.orderGateway.allOrders();

		// Ordenar os pedidos de acordo com a ordem do array validStatuses
		return orders.sort((a, b) => {
		  const indexA = validStatuses.indexOf(a.getStatus());
		  const indexB = validStatuses.indexOf(b.getStatus());
	  
		  return indexA - indexB;
		});
		
	}

	async getOrderTracking(): Promise<Order[]> { 
		const validStatuses = ["Processed", "Shipped", "Delivered"];

		const orderModels = await this.orderGateway.allOrders({
			where: {
			  status: validStatuses
			}
		  });

		  return orderModels.map(model => {
			const order = OrderMapper.toEntity(model);
			
			// Calcular a diferença em segundos entre data de criação e atualização
			const createdAt = new Date(order.getCreatedAt());
			const updatedAt = new Date(order.getUpdatedAt());
			const timeDifferenceInSeconds = differenceInSeconds(updatedAt, createdAt);
		
			// Converter a diferença em segundos para hh:mm:ss
			const hours = Math.floor(timeDifferenceInSeconds / 3600).toString().padStart(2, '0');
			const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60).toString().padStart(2, '0');
			const seconds = (timeDifferenceInSeconds % 60).toString().padStart(2, '0');
		
			// Atribuir o tempo decorrido ao objeto `order` (pode ser necessário adicionar um método `setTimeElapsed` na entidade `Order`)
			order.setTimeElapsed(`${hours}:${minutes}:${seconds}`);
			
			return order;
		  });
	}

	async getOrderById(id: number): Promise<Order | null> {
		const order = await this.orderGateway.getOrderById(id);
		return order ? order : null;
	}

	public async createOrder(data: {
        customerId: number;
        campaignId?: number;}): Promise<Order> {		
		const customer = await this.customerGateway.getCustomerById(data.customerId);
		if (!customer) {
			throw new Error("Customer not found");
		}

		let campaign;
		
		if (data.campaignId) {
            campaign = await this.campaignGateway.getCampaignById(data.campaignId);
            if (!campaign) {
                throw new Error("Campaign not found");
            }
        }
		const order = new Order(
			data.customerId,         // customerId
			'Created',             // status
			0,              // price
			data.campaignId        // campaignId (opcional)
		);

		return await this.orderGateway.newOrder(order);
	}

	async updateOrder(id: number, data: Order): Promise<void> {
		const existingOrder = await this.getOrderById(id);
        if (!existingOrder) {
            throw new Error("Order not found");
        }
        await this.orderGateway.updateOrder(id, data);        
	}

	async deleteOrder(orderId: number): Promise<number> {
		return await this.orderGateway.deleteOrder(orderId);
	}

	async createOrderProductAssociation(orderId: number, data: { combos: { comboId: number }[]; products: { productId: number }[]; observation?: string }): Promise<void> {
		// Verificar se o pedido existe		
		const order = await this.orderGateway.getOrderById(orderId);
			
		if (!order)	throw new Error('Order not found');

		if (order.getStatus() != 'Created') throw new Error("Order cannot be changed");

		const orderProducts: OrderProduct[] = [];

		// Processar Combos
		if (data.combos) {
			for (const comboEntry of data.combos) {
				const combo = await this.comboGateway.getComboById(comboEntry.comboId);
				const comboProducts = await this.comboGateway.productsOfCombo(comboEntry.comboId);
				if (!comboProducts || comboProducts.length === 0) {
					throw new Error(`No products found for combo ID ${comboEntry.comboId}`);
				}
		
				for (const comboProduct of comboProducts) {					
					const orderProduct = new OrderProduct(orderId, comboProduct.getProduct().getId(), data.observation, combo.getId());
					orderProducts.push(orderProduct);
					// Adicionando o preço com desconto do combo
					// Adicionando o preço com desconto do combo considerando a quantidade
					const discountedPrice = orderProduct.calculateTotalPrice(comboProduct.getProduct().getPrice(), combo.getDiscount());					
					order.addToTotalPrice(discountedPrice);
				}
			}
		}

		// Processar Produtos Individuais
		if (data.products) {
			for (const productEntry of data.products) {
				const product = await this.productGateway.getProductById(productEntry.productId);
				if (!product) {
					throw new Error(`No products found ID ${productEntry.productId}`);
				}
				const orderProduct = new OrderProduct(orderId, productEntry.productId, data.observation);
				orderProducts.push(orderProduct);
				// Adicionando o preço do produto
				const totalPrice = orderProduct.calculateTotalPrice(product.getPrice());				
        		order.addToTotalPrice(totalPrice);				
			}
		}

		// Adicionar produtos ao pedido
		await this.orderGateway.newProductAssociation(orderProducts);

		// Verificar se há um desconto de campanha
		if (order.getCampaign()) {
		  const campaign = await this.campaignGateway.getCampaignById(order.getCampaign());
		  if (campaign) {
			const discount = campaign.getDiscount();
			order.applyCampaignDiscount(discount);
		  }
		}		
		// Atualizar o valor do pedido no banco de dados
		await this.orderGateway.updateOrderTotalPrice(orderId, order.getPrice());
		
	}

	async deleteOrderProductAssociation(orderId: number, data: { combos?: { comboId: number }[]; products?: { productId: number }[] }): Promise<void> {
		
		if (!orderId) throw new Error("Missing required field: orderId");
		if (!data.combos && !data.products) throw new Error("No products registered in the order");

		const order = await this.orderGateway.getOrderById(orderId);
		if (!order) throw new Error("Order not found");
		if (order.getStatus() != 'Created') throw new Error("Order cannot be changed");


		// Remover produtos de combos
		if (data.combos) {
			for (const comboEntry of data.combos) {
			  const comboProducts = await this.comboGateway.productsOfCombo(comboEntry.comboId);
			  if (!comboProducts || comboProducts.length === 0) {
				throw new Error(`No products found for combo ID ${comboEntry.comboId}`);
			  }
	  
			  for (const comboProduct of comboProducts) {
				await this.orderGateway.deleteProductOfOrder(orderId, comboProduct.getProduct().getId(), comboEntry.comboId);
			  }
			}
		}

		if (data.products) {
			for (const productEntry of data.products) {
			  await this.orderGateway.deleteProductOfOrder(orderId, productEntry.productId, null);
			}
		}
	}

	async getOrderProducts(orderId: number): Promise<{ product: Product; comboId: number | null }[]> {
		const products = await this.orderGateway.productsOfOrder(orderId);

		if (!products) {
			throw new Error('Order not found');
		}
	  
		return products;
	}

	// async updateOrderPrice(id: number): Promise<void> {
	// 	let orderPrice = 0;

	// 	const order = await this.getOrderById(id);		
	// 	if (!order) return;
	// 	if (order.getStatus() != 'Created') return;

	// 	const products = await this.orderGateway.productsOfOrder(id);
	// 	for (const product of products) {
	// 		const productsOrder = product.dataValues.product;
	// 		let discount = 0;
	// 		if (product.dataValues.comboId) {
	// 			const resultCombo = await this.comboGateway.getComboById({ where: { id: product.dataValues.comboId } });
	// 			if (resultCombo) {
	// 				console.log(resultCombo)
	// 				//discount = resultCombo.discount;
	// 			}
	// 		}
	// 		for (const productDetail of productsOrder) {
	// 			order.orderPrice += productDetail.dataValues.price - (productDetail.dataValues.price * discount);
	// 		}
	// 	}

	// 	if (order.campaignId) {
	// 		const campaign = await this.campaignGateway.getCampaignById(order.campaignId);
	// 		order.orderPrice -= order.orderPrice * campaign[0].getDiscount();

			
	// 		if (order.customerId !== undefined) {
	// 			order.setCustomer(order.customerId);
	// 		}
	// 		if (order.customerId !== undefined) {
	// 			order.setStatus(order.status);
	// 		}
	// 		if (order.customerId !== undefined) {
	// 			order.setPrice(order.orderPrice);
	// 		}
	// 		if (order.customerId !== undefined) {
	// 			order.setCampaign(order.campaignId);
	// 		}			      

	// 		await this.orderGateway.updateOrder(id, order);
	// 	}
	// }

	// async updateOrderStatus(orderData: {
    //     id: number;
    //     status: string;
    //     price: number;
    //     customerId?: number; // opcional, dependendo do seu caso de uso
    // }): Promise<number> {
    //     const { id, status, price, customerId } = orderData;

    //     if (!id) {
    //         throw new Error("Missing required field: id");
    //     }

    //     // Obtém a ordem existente
    //     const existingOrder = await this.getOrderById(id);
    //     if (!existingOrder || existingOrder.length === 0) {
    //         throw new Error("Order not found");
    //     }

    //     // Cria a instância da entidade Order
        
	// 	if (customerId !== undefined) {
	// 		existingOrder.setCustomerId(customerId);
	// 	}
	// 	if (status !== undefined) {
	// 		existingOrder.setStatus(status);
	// 	}
	// 	if (price !== undefined) {
	// 		existingOrder.setPrice(price);
	// 	}			

    //     // Atualiza o status da ordem
    //     const updatedCount = await this.orderGateway.updateOrder(id, existingOrder);

    //     return updatedCount;
	
	// }

	async getOrderByStatus(orderStatus: string): Promise<any[]> {
		const result = await this.orderGateway.allOrders({
			where: { status: orderStatus },
			order: [["updatedAt", "ASC"]],
		});

		return result.map((order) => {
			const timeValue = new Date().getMinutes() - new Date(order["updatedAt"]).getMinutes();
			return {
				id: order.getId(),
				status: order.getStatus(),
				timeQueue: `${timeValue} Minutes`,
			};
		});
	}
}
