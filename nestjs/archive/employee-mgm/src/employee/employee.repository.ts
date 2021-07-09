import { EntityRepository, Repository } from "typeorm";
import { Employee } from "./employee.entity";
import { v4 as uuidv4 } from 'uuid';
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { BaseEmployeeDto } from "./dto/base-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { InternalServerErrorException, Logger } from "@nestjs/common";


@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {

    private logger = new Logger("EmployeeRepository");

    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {

        const { employeeCode } = createEmployeeDto;

        const employee = new Employee();
        employee.externalId = uuidv4();
        employee.employeeCode = employeeCode;
        this.setEmployeeFields(employee, createEmployeeDto);
        await employee.save();
        return employee;
    }

    async updateEmployee(employee: Employee, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
        this.setEmployeeFields(employee, updateEmployeeDto);
        await employee.save();
        return employee;
    }
    async getEmployeeByEmailOrCode(emailAddress: string, employeeCode: string): Promise<Employee[]> {
        const query = this.createQueryBuilder('employee');
        if (emailAddress) {
            query.where('employee.emailAddress =:emailAddress', { emailAddress })
        }
        if (employeeCode) {
            query.where('employee.employeeCode =:employeeCode', { employeeCode })
        }
        const employees = await query.getMany();
        return employees;
    }

    async getEmployees(): Promise<Employee[]> {
        const query = this.createQueryBuilder('employee');
        try {
            const employees = await query.getMany();
            return employees;
        }
        catch (error) {
            this.logger.error(`Failed to get employee records`, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async getEmployeeByExternalId(externalId: string): Promise<Employee> {
        const query = this.createQueryBuilder('employee');
        query.where('employee.externalId = :externalId', { externalId });
        const employee = await query.getOne();
        return employee;
    }

    private setEmployeeFields(employee: Employee, dto: BaseEmployeeDto) {
        employee.firstName = dto.firstName;
        employee.lastName = dto.lastName;
        employee.emailAddress = dto.emailAddress;
        employee.dateOfJoining = dto.dateOfJoining;
        employee.teamName = dto.teamName;
        employee.designation = dto.designation;
        employee.mobileNumber = dto.mobileNumber;
    }
}