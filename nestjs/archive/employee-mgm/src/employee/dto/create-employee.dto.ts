
import { IsNotEmpty } from "class-validator";
import { BaseEmployeeDto } from "./base-employee.dto";
export class CreateEmployeeDto extends BaseEmployeeDto{
    @IsNotEmpty()
    employeeCode:string;
}