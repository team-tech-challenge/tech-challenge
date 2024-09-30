import { PaymentUseCase } from "@usecases/PaymentUseCase";
import { defaultReturnStatement } from "@utils/http";

export class PaymentController {
	constructor(private paymentUseCase: PaymentUseCase) { }

	async getAll(req, res) {
		try {
			const payments = await this.paymentUseCase.getAll();
			defaultReturnStatement(res, "Payments", payments);
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}

	async createPayment(req, res) {
		try {
			const payment = await this.paymentUseCase.createPayment(req.body);
			defaultReturnStatement(res, "Payment Created", payment);
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		}
	}

	async updatePayment(req, res) {
		try {
			const result = await this.paymentUseCase.updatePayment(req.body, req.params.id);
			defaultReturnStatement(res, "Payment and Order updated successfully", result);
		} catch (err) {
			console.error(err);
			res.status(err.message === "Payment not executed" ? 404 : 500).json({ status: err.message === "Payment not executed" ? 404 : 500, error: err });
		}
	}

	async deletePayment(req, res) {
		try {
			const deletedCount = await this.paymentUseCase.deletePayment(req.params.id);
			const responseMessage = deletedCount === 1 ? "Payment deleted successfully" : "Payment not found";
			defaultReturnStatement(res, responseMessage, deletedCount);
		} catch (err) {
			console.error(err);
			res.status(err.message === "Payment not found" ? 404 : 500).json({ status: err.message === "Payment not found" ? 404 : 500, error: err });
		}
	}
}
