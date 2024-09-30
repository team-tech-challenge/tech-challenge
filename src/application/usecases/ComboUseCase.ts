import { IComboGateway } from "@gateways/IComboGateway";
import { Combo } from "@entities/Combo";
import { Product } from "@entities/Product";

export class ComboUseCase {
	constructor(private readonly comboGateway: IComboGateway) { }

	async getAll(): Promise<Combo[]> {
		return await this.comboGateway.allCombos();
	}

	async getComboById(id: number): Promise<Combo | null> {
		const combos = await this.comboGateway.getComboById({ where: { id } });
		return combos.length ? combos[0] : null;
	}

	async createCombo(data: Partial<Combo>): Promise<Combo> {
		const { name, discount } = data;
		const combo = new Combo(name, discount);
		return await this.comboGateway.newCombo(combo);
	}

	async createComboProductAssociation(data: any): Promise<void> {
		return await this.comboGateway.newProductAssociation(data);
	}

	async getComboProducts(id: string): Promise<Product[]> {
		return await this.comboGateway.productsOfCombo(id);
	}
}
