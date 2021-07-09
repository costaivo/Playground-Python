
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
* Configuration file for TypeOrm Module
*
* Set the Database Type and connection details 
*
* Set the entities path 
*
* Set the synchronize option. If true, will update the database automatically.
*/
export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'sa123456#',
    database: 'training-Tracker',
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: true,
}