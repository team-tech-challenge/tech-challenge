import { Combo } from "@entities/Combo";

export interface IComboGateway {
	allCombos(): Promise<Combo[]>;

	getComboById(condition?: any): Promise<Combo[]>;

	newCombo(combo: Combo): Promise<Combo>;

	newProductAssociation(values: any): Promise<any>;

	productsOfCombo(id: string): Promise<any[]>;
}
