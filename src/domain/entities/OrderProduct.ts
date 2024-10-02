export class OrderProduct {
  private orderId: number;
  private productId: number;
  private comboId: number | null; // FK para combo, caso o produto faça parte de um combo
  private observation: string | null;

  constructor(orderId: number, productId: number, observation?: string, comboId?: number) {
    this.orderId = orderId;
    this.productId = productId;
    this.comboId = comboId || null;
    this.observation = observation || null;
  }

  // Getters
  getOrderId(): number {
    return this.orderId;
  }

  getProductId(): number {
    return this.productId;
  }

  getComboId(): number | null {
    return this.comboId;
  }

  getObservation(): string | null {
    return this.observation;
  }

  // Calcula o preço total baseado na quantidade
  calculateTotalPrice(price: number, discount: number = 0): number {
    const discountPercentage = discount / 100; // Converte o desconto para porcentagem
    return price * (1 - discountPercentage);
  }
}