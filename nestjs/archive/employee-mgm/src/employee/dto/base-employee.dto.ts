
import { IsEnum, IsISO8601, IsNotEmpty, IsNumberString, IsOptional } from "class-validator";
import { Designation } from "../employee.entity";

export class BaseEmployeeDto{
    @IsNotEmpty()
    firstName:string;

    @IsOptional()
    middleName?:string;

    @IsNotEmpty()
    lastName:string;

    @IsOptional()
    teamName?:string;
    
    @IsEnum(Designation)
    designation:Designation;
    
    @IsISO8601()
    dateOfJoining:Date;
    
    @IsNumberString()
    mobileNumber:string;
    
    @IsNotEmpty()
    emailAddress:string;
}