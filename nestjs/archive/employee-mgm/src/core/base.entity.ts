import { ApiHideProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class AuditingEntity extends BaseEntity {
    @ApiHideProperty()
    @Exclude({toPlainOnly:true})
    @PrimaryGeneratedColumn()
    id: number;

    @Column("uuid",{unique:true})
    external_id:string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @CreateDateColumn({ type: 'timestamp' })
    updated_at!: Date;
}