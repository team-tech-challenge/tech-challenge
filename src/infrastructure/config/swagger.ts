import swaggerAutogen from "swagger-autogen";

const doc = {
	info: {
		version: "v1.0.0",
		title: "Swagger Tech Challenge",
		description: "Tech Challenge API",
	},
	servers: [
		{
			url: "http://localhost:3000",
		},
	],
	definitions: {
		Category: {
			name: "Category Name",
		},
		Customer: {
			cpf: "555.555.555-55",
			name: "Name of customer",
			phoneNumber: "(99) 99999-9999",
			email: "email@example.com",
		},
		Combo: {
			name: "Combo Name",
			discount: "10",
		},
		Order: {
			customerId: 1,
			status: "Created",
			price: "19.90",
		},
		Tracking: {
			customerId: 1,
			status: "Processed",
			price: 65.90,
			id: 1,
			createdAt: "2024-09-27T02:26:48.176Z",
			updatedAt: "2024-09-30T22:33:58.842Z",
			timeElapsed: "92:07:10"
		},
		Product: {
			name: "Product Name",
			price: "8.90",
			description: "Product Name",
			category: {
				$ref: "#/definitions/Category",
			}
		},
		Campaign: {
			name: "Campaign Name",
			campaignRule: "Campaign Rule",
			discount: "10",
			endDate: "2021-10-20",
		},
		Employee: {
			cpf: "555.555.555-55",
			name: "Name of employee",
			username: "employee@employee",
			password: "E$%0of323!@#",
		},
		Payment: {			
			orderId: 1
		},
		webhookPayment: {
			paymentCode: "12345678",
			type: "payment"			
		},
		FakeCheckout: {
			paymentMethod: "MercadoPago",
			paymentCode: "sdofjsiodj",
			status: "PAID",
			orderId: 1,
		},
		getEmployee: {
			cpf: "555.555.555-55",
			name: "Name of employee",
			username: "employee@employee",
		},
		AddProduct: {
			name: "Product Name",
			price: "8.90",
			description: "Product Description",
			categoryId: 1,
		},
		AddOrder: {
			customerId: 1
		},
		UpdateOrder: {
			customerId: 1,
			status: "Initial Status",
			price: "19.90",
		},
		AddComboProduct: {
			comboId: 1,
			productId: 1,
		},
		AddOrderProduct: {
			orderId: 1,
			combos: [{ comboId: 1 }],
			products: [{ productId: 2 }, { productId: 2 }],
			observation: "Some Observations",
		},
		AddCampaignCustomer: {
			campaignId: 1,
			customerId: 1,
		},
	},
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/infrastructure/config/routes.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
