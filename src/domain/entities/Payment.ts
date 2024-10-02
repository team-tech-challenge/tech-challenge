export class Payment {
	private id?: number;
	private paymentMethod: string;
	private paymentCode: string;
	private status: string;
	private orderId: number;
	private ticketUrl?: string;
	private qrCode?: string;
	private qrCodeBase64?: string;

	constructor(paymentMethod: string, paymentCode: string, status: string, orderId: number, id?: number) {
		this.paymentMethod = paymentMethod;
		this.paymentCode = paymentCode;
		this.status = status;
		this.orderId = orderId;
		this.id = id;
	}

	public getId(): number | undefined {
		return this.id;
	}

	public getPaymentMethod(): string {
		return this.paymentMethod;
	}

	public getPaymentCode(): string {
		return this.paymentCode;
	}

	public getStatus(): string {
		return this.status;
	}

	public setStatus(status: string): void {
		if (!status) {
			throw new Error("Name cannot be empty");
		}
		this.status = status;
	}

	public getOrder(): number {
        return this.orderId;
    }

	public setTicketUrl(ticketUrl: string): void {
		this.ticketUrl = ticketUrl;
	}

	public getTicketUrl(): string | undefined {
		return this.ticketUrl;
	}

	public setQrCode(qrCode: string): void {
		this.qrCode = qrCode;
	}

	public getQrCode(): string | undefined {
		return this.qrCode;
	}

	public setQrCodeBase64(qrCodeBase64: string): void {
		this.qrCodeBase64 = qrCodeBase64;
	}

	public getQrCodeBase64(): string | undefined {
		return this.qrCodeBase64;
	}
   
}
