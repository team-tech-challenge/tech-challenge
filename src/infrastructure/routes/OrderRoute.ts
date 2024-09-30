import { Router } from "express";
import { OrderAdapter } from "@adapters/OrderAdapter";
import { OrderUseCase } from "@usecases/OrderUseCase";
import { OrderController } from "@controllers/OrderController";
import { CustomerAdapter } from "@adapters/CustomerAdapter";
import { ComboAdapter } from "@adapters/ComboAdapter";
import { CampaignAdapter } from "@adapters/CampaignAdapter";

export const orderRoute = Router();

const orderAdapter = new OrderAdapter();
const customerAdapter = new CustomerAdapter();
const comboAdapter = new ComboAdapter();
const campaignAdapter = new CampaignAdapter();
const orderUseCase = new OrderUseCase(
	orderAdapter,
	customerAdapter,
	comboAdapter,
    campaignAdapter
);
const orderController = new OrderController(orderUseCase);

orderRoute.get("/all", (req, res) => {
	// #swagger.tags = ['Order']
	/* #swagger.responses[200] = {
            description: 'Return all orders',
            schema: { $ref: '#/definitions/Order' }
    } */
	orderController.getAll(req, res);
});

orderRoute.get("/:Id", (req, res) => {
	// #swagger.tags = ['Order']
	orderController.getOrderById(req, res);
});

orderRoute.post("/create", (req, res) => {
	// #swagger.tags = ['Order']
	/* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/Order' }
                }
            }
        }
    */
	orderController.createOrder(req, res);
});

orderRoute.delete("/delete/:id", (req, res) => {
	// #swagger.tags = ['Order']
	orderController.deleteOrder(req, res);
});

orderRoute.put("/update/:id", (req, res) => {
	// #swagger.tags = ['Order']
	/* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/Order' }
                }
            }
        }
    */
	orderController.updateOrder(req, res);
});

orderRoute.post("/product/association/create", (req, res) => {
	// #swagger.tags = ['Order']
	/* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/AddOrderProduct' }
                }
            }
        }
    */
	orderController.createOrderProductAssociation(req, res);
});

orderRoute.post("/product/association/remove", (req, res) => {
    // #swagger.tags = ['Order']
    /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/AddOrderProduct' }
                }
            }
        }
    */
    orderController.deleteOrderProductAssociation(req, res);
});

orderRoute.get("/:id/products", (req, res) => {
	// #swagger.tags = ['Order']
	orderController.getOrderProducts(req, res);
});

orderRoute.get("/orderByStatus/:status", (req, res) => {
	// #swagger.tags = ['Queue']
	/* #swagger.parameters['status'] = {
        in: 'path',
        description: 'Status of the order',
        required: true,
        type: 'string',
        schema: 'Recebido'
	} */
	orderController.getOrderByStatus(req, res);
});
