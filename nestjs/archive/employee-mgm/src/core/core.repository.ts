import { EntityRepository, Repository } from "typeorm";
import { AuditingEntity } from "./base.entity";

@EntityRepository(AuditingEntity)
export class AuditingRepository<Entity extends AuditingEntity>  extends Repository<Entity> {
    public async getByExternalId(external_id: string): Promise<Entity|undefined> {
        const query = this.createQueryBuilder('auditing');
        query.where('auditing.external_id = :external_id', { external_id });
        const result = await query.getOne();
        return result;
    }
}