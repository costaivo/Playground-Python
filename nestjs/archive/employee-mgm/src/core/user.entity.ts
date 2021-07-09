import { BaseEntity, Column, Entity } from "typeorm";
import { AuditingEntity } from "./base.entity";

@Entity()
export class User extends AuditingEntity {
    @Column()
    name:string;
}