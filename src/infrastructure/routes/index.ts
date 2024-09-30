import express from "express";
import initDatabase from "@database";
import { campaignRoute } from "@routes/CampaignRoute";
import { categoryRoute } from "@routes/CategoryRoute";
import { comboRoute } from "@routes/ComboRoute";
import { customerRoute } from "@routes/CustomerRoute";
import { employeeRoute } from "@routes/EmployeeRoute";
import { orderRoute } from "@routes/OrderRoute";
import { paymentRoute } from "@routes/PaymentRoute";
import { productRoute } from "@routes/ProductRoute";

export const apiRoutes = express.Router();

initDatabase();

apiRoutes.use("/category", categoryRoute);
apiRoutes.use("/product", productRoute);
apiRoutes.use("/combo", comboRoute);
apiRoutes.use("/order", orderRoute);
apiRoutes.use("/customer", customerRoute);
apiRoutes.use("/payment", paymentRoute);
apiRoutes.use("/campaign", campaignRoute);
apiRoutes.use("/employee", employeeRoute);
