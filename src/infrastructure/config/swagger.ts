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
			fk_idCustomer: 1,
			status: "Created",
			price: "19.90",
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
			paymentMethod: "MercadoPago",
			paymentCode: "sdofjsiodj",
			status: "toPay",
			fk_idOrder: 1,
		},
		FakeCheckout: {
			paymentMethod: "MercadoPago",
			paymentCode: "sdofjsiodj",
			status: "PAID",
			fk_idOrder: 1,
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
			fk_idCategory: 1,
		},
		AddOrder: {
			fk_idCustomer: 1,
			status: "Initial Status",
			price: "19.90",
		},
		AddComboProduct: {
			fk_idCombo: 1,
			fk_idProduct: 1,
		},
		AddOrderProduct: {
			fk_idOrder: 1,
			combos: [{ fk_idCombo: 1 }],
			products: [{ fk_idProduct: 2 }, { fk_idProduct: 2 }],
			observation: "Some Observations",
		},
		AddCampaignCustomer: {
			fk_idCampaign: 1,
			fk_idCustomer: 1,
		},
	},
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/infrastructure/config/routes.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
