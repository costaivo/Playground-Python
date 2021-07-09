import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeRepository } from './employee.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/core/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeRepository,UserRepository])
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController]
})
export class EmployeeModule { }
  