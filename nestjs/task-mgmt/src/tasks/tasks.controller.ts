import { Post, UseGuards } from '@nestjs/common';
import { Body, Param } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) {

    }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto,
        @GetUser() user: User)
        : Promise<Task[]> {
        return this.taskService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTask(@Param('id') id: string,
        @GetUser() user: User): Promise<Task> {
        return this.taskService.getTaskById(id, user);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string,
    @GetUser() user: User): Promise<void> {
        return this.taskService.deleteTaskById(id,user);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User): Promise<Task> {
        return this.taskService.createTask(createTaskDto, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
        @GetUser() user: User): Promise<Task> {
        return this.taskService.updateTaskStatus(id, updateTaskDto.status,user);
    }
}
