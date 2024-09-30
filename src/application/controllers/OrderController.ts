import { OrderUseCase } from "@usecases/OrderUseCase";
import { defaultReturnStatement } from "@utils/http";

export class OrderController {
	constructor(private orderUseCase: OrderUseCase) { }

	async getAll(req, res) {
		try {
			const orders = await this.orderUseCase.getAll();
			defaultReturnStatement(res, "Orders", orders);
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}

	async getOrderById(req, res) {
		try {
			const order = await this.orderUseCase.getOrderById(req.params.Id);
			defaultReturnStatement(res, "Orders", order);
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}

	async createOrder(req, res) {
		try {
			const order = await this.orderUseCase.createOrder(req.body);
			defaultReturnStatement(res, "Order Created", order);
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}

	async updateOrder(req, res) {
		try {
			const updatedCount = await this.orderUseCase.updateOrder(req.body);
			const responseMessage = updatedCount === 1 ? "Order Updated" : "Order Not Found";
			defaultReturnStatement(res, responseMessage, updatedCount);
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}

	async deleteOrder(req, res) {
		try {
			const deletedCount = await this.orderUseCase.deleteOrder(req.params.Id);
			const responseMessage = deletedCount === 1 ? "Order Deleted" : "Order Not Found";
			defaultReturnStatement(res, responseMessage, deletedCount);
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}

	async createOrderProductAssociation(req, res) {
		try {
			await this.orderUseCase.createOrderProductAssociation(req.body);
			defaultReturnStatement(res, "Order Product Association Created", "Operation executed successfully.");
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}

	async deleteOrderProductAssociation(req, res) {
		try {
			await this.orderUseCase.deleteOrderProductAssociation(req.body);
			defaultReturnStatement(res, "Order Product Association Deleted", "Operation executed successfully.");
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}

	async getOrderProducts(req, res) {
		try {
			const products = await this.orderUseCase.getOrderProducts(req.params.id);
			defaultReturnStatement(res, "Order Products", products);
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}

	async updateOrderStatus(req, res) {
		try {
			const updatedCount = await this.orderUseCase.updateOrderStatus(req.body);
			const responseMessage = updatedCount === 1 ? "Order Status Updated" : "Order Not Found";
			defaultReturnStatement(res, responseMessage, updatedCount);
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}

	async getOrderByStatus(req, res) {
		try {
			const orders = await this.orderUseCase.getOrderByStatus(req.params.status);
			defaultReturnStatement(res, "Orders by Status", orders);
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}
}
