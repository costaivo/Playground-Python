import { Post } from '@nestjs/common';
import { Body, Param } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {

    }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto);
        }
        else
            return this.taskService.getAllTasks();
    }
    @Get('/:id')
    getTask(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }
    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTaskById(id);
    }
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto);
    }
    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string,
     @Body() updateTaskDto: UpdateTaskDto) : Task {
        return this.taskService.updateTaskStatus(id, updateTaskDto.status);
    }
}
