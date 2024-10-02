import { OrderProduct } from "@entities/OrderProduct";
import { OrderProduct as  OrderProductModel } from '@database/OrderProductModel';

export class OrderProductMapper {
  
  public static toEntity(orderProductModel: any): OrderProduct {
    return new OrderProduct(
      orderProductModel.orderId,
      orderProductModel.productId,      
      orderProductModel.observation,
      orderProductModel.comboId
    );
  }

  public static toModel(orderProduct: OrderProduct): any {
    return {
      orderId: orderProduct.getOrderId(),
      productId: orderProduct.getProductId(),
      observation: orderProduct.getObservation(),
      comboId: orderProduct.getComboId()
    };
  }

  
}