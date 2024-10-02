import { IPaymentGateway } from "@gateways/IPaymentGateway";
import { Payment as PaymentModel} from "@database/PaymentModel";
import { Payment } from "@entities/Payment";
import { PaymentMapper } from "@mappers/PaymentMapper";

export class PaymentAdapter implements IPaymentGateway {
	async allPayments(): Promise<Payment[]> {
		const paymentModels = await PaymentModel.findAll(); 
		return paymentModels.map(model => PaymentMapper.toEntity(model));		
	}

	async getPaymentById(id:number): Promise<Payment> {
        const paymentModel = await PaymentModel.findOne({ where: { id } });
        return PaymentMapper.toEntity(paymentModel);	
    }

	async getPaymentByOrderId(id:number): Promise<Payment> {
        const paymentOrderModel = await PaymentModel.findOne({ where: { orderId:id } });
        return PaymentMapper.toEntity(paymentOrderModel);	
    }

	async getPaymentByMp(paymentCode:string): Promise<Payment> {
        const paymentModel = await PaymentModel.findOne({ where: { paymentCode:paymentCode } });
        return PaymentMapper.toEntity(paymentModel);	
    }

	async newPayment(values: any): Promise<Payment> {
		const paymentModels = await PaymentModel.create(values);
        return PaymentMapper.toEntity(paymentModels);		
	}

	async updatePayment(id: number, data: Payment): Promise<number> {
		
        const existingPayment = await PaymentModel.findOne({ where: { id } });

        if (!existingPayment) {
            throw new Error("Payment not found");
        }
        
		
		const [affectedCount] = await PaymentModel.update(data, {
			where: { id }
		});

        return affectedCount;
	}

	deletePayment(params: any): Promise<number> {
		return PaymentModel.destroy(params);
	}
}
