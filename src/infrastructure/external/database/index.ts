import connection from "@config/connectionFactory";
import { Campaign } from "@database/CampaignModel";
import { CampaignCustomer } from "@database/CampaignCustomerModel";
import { Category } from "@database/CategoryModel";
import { Combo } from "@database/ComboModel";
import { ComboProduct } from "@database/ComboProductModel";
import { Customer } from "@database/CustomerModel";
import { Employee } from "@database/EmployeeModel";
import { Order } from "@database/OrderModel";
import { OrderProduct } from "@database/OrderProductModel";
import { Payment } from "@database/PaymentModel";
import { Product } from "@database/ProductModel";

export default () => {
	connection.database.addModels([
		Category,
		Product,
		Combo,
		Customer,
		Order,
		Payment,
		Campaign,
		Employee,
		CampaignCustomer,
		ComboProduct,
		OrderProduct,
	]);
};
