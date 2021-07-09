import { ApiHideProperty } from "@nestjs/swagger/dist/decorators/api-hide-property.decorator";
import { Exclude } from "class-transformer";
import { IsEmail } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum Designation {
    JUNIOR_DEVELOPER = "Junior Developer",
    DEVELOPER = "Developer",
    SENIOR_DEVELOPER = "Senior Developer"
}


@Entity()
export class Employee extends BaseEntity {
    @ApiHideProperty()
    @Exclude({toPlainOnly:true})
    @PrimaryGeneratedColumn()
    id: number;

    @Column("uuid",{unique:true})
    externalId:string;

    @Column({unique: true})
    employeeCode: string;

    @Column({unique: true})
    @IsEmail()
    emailAddress: string;

    @Column()
    firstName: string;

    @Column({ nullable: true })
    middleName: string;

    @Column()
    lastName: string;

    @Column({
        type: "enum", 
        enum: Designation,
        default: Designation.JUNIOR_DEVELOPER
    })
    designation: string;

    @Column({ nullable: true })
    dateOfJoining: Date;

    @Column({ nullable: true })
    teamName:string;

    @Column({ nullable: true })
    mobileNumber:string;

    @ApiHideProperty()
    @Exclude({toPlainOnly:true})
    @Column({ nullable: true })
    password:string;

}