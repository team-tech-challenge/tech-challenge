import { Op } from "sequelize";
import { Combo } from "@database/ComboModel";
import { Product } from "@database/ProductModel";
import { ComboProduct } from "@database/ComboProductModel";
import { IComboGateway } from "@gateways/IComboGateway";

export class ComboAdapter implements IComboGateway {

	allCombos(): Promise<Combo[]> {
		return Combo.findAll();
	}

	getComboById(params?: any): Promise<Combo[]> {
		return Combo.findAll(params);
	}

	newCombo(values: any): Promise<Combo> {
		return Combo.create(values);
	}

	newProductAssociation(values: any): Promise<ComboProduct> {
		return ComboProduct.create(values);
	}

	productsOfCombo(id: string): Promise<ComboProduct[]> {
		return ComboProduct.findAll({
			where: { fk_idCombo: id },
			include:[
				{
					model:Combo,
					on: {
						"$combo.id$": {
							[Op.col]: "ComboProduct.fk_idCombo",
						},
					},
				},
				{
					model:Product,
					on: {
						"$product.id$": {
							[Op.col]: "ComboProduct.fk_idProduct",
						},
					},

				}
			]
		});
	}
}
