import { EntityRepository, Repository } from "typeorm";
import { AuditingRepository } from "./core.repository";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends AuditingRepository<User> {
   
}