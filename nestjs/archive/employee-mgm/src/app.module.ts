import { Module } from '@nestjs/common';
import { TypeOrmConfig } from './config/typeorm.config';
import { EmployeeModule } from './employee/employee.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    EmployeeModule],
})
export class AppModule {}
