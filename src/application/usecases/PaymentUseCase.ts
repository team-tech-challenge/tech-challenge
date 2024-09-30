import { IPaymentGateway } from "@gateways/IPaymentGateway";
import { IOrderGateway } from "@gateways/IOrderGateway";
import { Order as OrderEntitie } from "@entities/Order";
import { Payment } from "@entities/Payment";

export class PaymentUseCase {
	constructor(
		private readonly paymentGateway: IPaymentGateway,
		private readonly orderGateway: IOrderGateway
	) { }

	async getAll(): Promise<any> {
		return await this.paymentGateway.allPayments();
	}

	async createPayment(data: Partial<Payment>): Promise<Payment> {
		const { paymentMethod, paymentCode, status, fk_idOrder } = data;
		const payment = new Payment(paymentMethod, paymentCode, status, fk_idOrder);
		return await this.paymentGateway.newPayment(payment);
	}

	async updatePayment(paymentData: Payment, paymentId: string): Promise<any> {
		if (!paymentId) throw new Error("Missing required field: id");

		const result = await this.paymentGateway.updatePayment(
			{ ...paymentData },
			{ where: { id: paymentId } }
		);

		if (result[0] === 0) throw new Error("Payment not executed");

		const orderData = await this.orderGateway.getOrderById({ where: { id: paymentData.fk_idOrder } });
		let orderUpdated = new OrderEntitie(orderData);
		orderUpdated.status = "Recebido";

		await this.orderGateway.updateOrder(orderUpdated, { where: { id: paymentData.fk_idOrder } });

		return "Payment and Order updated successfully";
	}

	async deletePayment(paymentId: string): Promise<number> {
		if (!paymentId) throw new Error("Missing required parameter: id");

		const deletedCount = await this.paymentGateway.deletePayment({ where: { id: paymentId } });

		if (deletedCount === 0) throw new Error("Payment not found");

		return deletedCount;
	}
}
