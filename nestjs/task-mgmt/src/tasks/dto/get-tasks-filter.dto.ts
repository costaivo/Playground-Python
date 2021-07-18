import { IsEnum, IsOptional } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetTasksFilterDto {
    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;

    @IsOptional()
    search?: string;
}