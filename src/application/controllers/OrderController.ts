import { OrderUseCase } from "@usecases/OrderUseCase";
import { defaultReturnStatement } from "@utils/http";

export class OrderController {
    constructor(private readonly orderUseCase: OrderUseCase) {}

    async getAll(req, res): Promise<void> {
        try {
            const orders = await this.orderUseCase.getAll();
            res.json(orders);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getOrderTracking(req, res): Promise<void> {
        try {
            const orders = await this.orderUseCase.getOrderTracking();
            res.json(orders);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getOrderById(req, res): Promise<void> {
        try {
            const { Id } = req.params;
            const order = await this.orderUseCase.getOrderById(Id);
            if (order) {
                res.json(order);
            } else {
                res.status(404).json({ error: "Order not found" });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async createOrder(req, res): Promise<void> {
        try {                
            const order = await this.orderUseCase.createOrder(req.body);
            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateOrder(req, res): Promise<void> {
        try {
            const { id } = req.params;            
            await this.orderUseCase.updateOrder(id, req.body);            
            res.json({ message: "Order updated successfully" });            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteOrder(req, res): Promise<void> {
        try {
            const { id } = req.params;
            const result = await this.orderUseCase.deleteOrder(id);
            if (result > 0) {
                res.json({ message: "Order deleted successfully" });
            } else {
                res.status(404).json({ error: "Order not found" });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async createOrderProductAssociation(req, res): Promise<void> {
        try {            
            const { orderId, combos, products, observation } = req.body;
            await this.orderUseCase.createOrderProductAssociation(orderId, { combos, products, observation });
            res.status(200).json({ message: "Order product association created successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteOrderProductAssociation(req, res): Promise<void> {
        try {            
            const { orderId, combos, products } = req.body;
            await this.orderUseCase.deleteOrderProductAssociation(orderId, { combos, products });
            res.status(200).json({ message: "Order product association removed successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getOrderProducts(req, res): Promise<void> {
        try {
            const { id } = req.params;
            const products = await this.orderUseCase.getOrderProducts(id);
            res.status(200).json(products);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getOrderByStatus(req, res): Promise<void> {
        try {
            const { status } = req.params;
            const orders = await this.orderUseCase.getOrderByStatus(status);
            res.json(orders);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}