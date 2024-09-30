import { IPaymentGateway } from "@gateways/IPaymentGateway";
import { Payment } from "@database/PaymentModel";

export class PaymentAdapter implements IPaymentGateway {
	allPayments(): Promise<Payment[]> {
		return Payment.findAll();
	}

	newPayment(values: any): Promise<Payment> {
		return Payment.create(values);
	}

	updatePayment(values: any, params: any): Promise<any> {
		return Payment.update(values, params);
	}

	deletePayment(params: any): Promise<number> {
		return Payment.destroy(params);
	}
}
