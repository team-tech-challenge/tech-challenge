import { Employee } from "@entities/Employee";

export interface IEmployeeGateway {
	allEmployees(): Promise<Employee[]>;

	newEmployee(employee: Employee): Promise<Employee>;

	getEmployeeById(condition?: any): Promise<Employee[]>;

	findEmployee(cpf: string): Promise<Employee>;

	updateEmployee(
		id: number,
		employee: Employee
	): Promise<[affectedCount: number]>;

	deleteEmployee(id: number): Promise<number>;
}
