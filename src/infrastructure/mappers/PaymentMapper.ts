import { Payment } from "@entities/Payment";

export class PaymentMapper {
  // Mapeia de PaymentModel (banco) para Payment (domínio)
  static toEntity(paymentModel: any): Payment {
    return new Payment(            
      paymentModel.paymentMethod,
        paymentModel.paymentCode,
        paymentModel.status,
        paymentModel.orderId,
        paymentModel.id
    );
  }
  // Mapeia de Payment (domínio) para PaymentModel (banco)
  static toModel(Payment: Payment): any {
    return {        
        paymentMethod: Payment.getPaymentMethod(),
        paymentCode: Payment.getPaymentCode(),
        status: Payment.getStatus(),
        id: Payment.getId(),
        order: Payment.getOrder(),
    };
  }
}