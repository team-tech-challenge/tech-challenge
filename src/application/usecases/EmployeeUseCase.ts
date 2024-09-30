import { IEmployeeGateway } from "@gateways/IEmployeeGateway";
import { Employee } from "@entities/Employee";

export class EmployeeUseCase {
	constructor(private readonly employeeGateway: IEmployeeGateway) { }

	async getAll(): Promise<Employee[]> {
		return await this.employeeGateway.allEmployees();
	}

	async createEmployee(data: Partial<Employee>): Promise<Employee> {
		const { cpf, name, username, password } = data;
		const employee = new Employee(cpf, name, username, password);
		return await this.employeeGateway.newEmployee(employee);
	}

	async getEmployeeById(id: number): Promise<Employee | null> {
		const employees = await this.employeeGateway.getEmployeeById({ where: { id } });
		return employees.length ? employees[0] : null;
	}

	async findEmployee(cpf: string): Promise<Employee | null> {
		return await this.employeeGateway.findEmployee(cpf);
	}

	async updateEmployee(id: number, data: Employee): Promise<[affectedCount: number]> {
		const employee = await this.getEmployeeById(id);
		if (!employee) throw new Error("Employee not found");
		return await this.employeeGateway.updateEmployee(id, data);
	}

	async deleteEmployee(id: number): Promise<number> {
		return await this.employeeGateway.deleteEmployee(id);
	}
}
