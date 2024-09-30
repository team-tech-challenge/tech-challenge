import { Router } from "express";
import { PaymentAdapter } from "@adapters/PaymentAdapter";
import { PaymentUseCase } from "@usecases/PaymentUseCase";
import { PaymentController } from "@controllers/PaymentController";
import { OrderAdapter } from "@adapters/OrderAdapter";

export const paymentRoute = Router();

const paymentAdapter = new PaymentAdapter();
const orderAdapter = new OrderAdapter();
const paymentUseCase = new PaymentUseCase(paymentAdapter, orderAdapter);
const paymentController = new PaymentController(paymentUseCase);

paymentRoute.get("/all", (req, res) => {
	// #swagger.tags = ['Payment']
	/* #swagger.responses[200] = {
            description: 'Return all payments',
            schema: { $ref: '#/definitions/Payment' }
    } */
	paymentController.getAll(req, res);
});

paymentRoute.post("/create", (req, res) => {
	// #swagger.tags = ['Payment']
	/* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/Payment' }
                }
            }
        }
    */
	paymentController.createPayment(req, res);
});

paymentRoute.delete("/delete/:id", (req, res) => {
	// #swagger.tags = ['Payment']
	paymentController.deletePayment(req, res);
});

paymentRoute.put("/update/:id", (req, res) => {
	// #swagger.tags = ['FakeCheckout']
	/* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/FakeCheckout' }
                }
            }
        }
    */
	paymentController.updatePayment(req, res);
});
