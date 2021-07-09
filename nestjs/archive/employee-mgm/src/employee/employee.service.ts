import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';
import { EmployeeRepository } from './employee.repository';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {

    constructor(
        @InjectRepository(EmployeeRepository)
        private employeeRepository: EmployeeRepository) { }


    getEmployees(): Promise<Employee[]> {
        return this.employeeRepository.getEmployees();
    }

    getEmployeeById(id: string): Promise<Employee> {
        const employee = this.employeeRepository.getEmployeeByExternalId(id);
        return employee;
    }

    
   async  createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { employeeCode, emailAddress} = createEmployeeDto;

    // Validate if the employeeCode or Email Address is not not present in the DB
    const existingEmployees = await this.employeeRepository.getEmployeeByEmailOrCode(emailAddress, employeeCode);

    if (existingEmployees.length > 0) {
        if (existingEmployees[0].emailAddress == emailAddress)
            throw new BadRequestException(`Employee Email Address: "${emailAddress}" already exists in DB`);
        if (existingEmployees[0].employeeCode == employeeCode)
            throw new BadRequestException(`Employee Code: "${employeeCode}" already exists in DB`);
    }
    return this.employeeRepository.createEmployee(createEmployeeDto);
}

    async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
        const employee = await this.getEmployeeByExternalId(id);
        await this.employeeRepository.updateEmployee(employee, updateEmployeeDto);
        return employee;
    }

    async deleteEmployee(id: string): Promise<void> {
        const employee = await this.getEmployeeByExternalId(id);
            this.employeeRepository.remove(employee);
    }

    private async getEmployeeByExternalId(id:string){
        const employee = await this.employeeRepository.getEmployeeByExternalId(id);
        if (!employee) {
            throw new NotFoundException(`Employee with Id "${id}" not found in DB`);
        }
        return employee;
    }
}
