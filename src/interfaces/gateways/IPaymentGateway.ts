import { Payment } from "@entities/Payment";

export interface IPaymentGateway {
	allPayments(): Promise<Payment[]>;

	newPayment(Payment: Payment): Promise<Payment>;

	updatePayment(
		Payment: Payment,
		params: any
	): Promise<[affectedCount: number]>;

	deletePayment(params: any): Promise<number>;
}
