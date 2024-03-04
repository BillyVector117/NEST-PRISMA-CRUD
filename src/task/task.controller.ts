import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException, NotFoundException } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "@prisma/client";

//localHost:3000/tasks
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }
    @Get()
    async getAllTasks() {
        return this.taskService.getAllTasks()
    }
    @Post()
    async createTask(@Body() data: Task) {
        return this.taskService.createTask(data)
    }
    @Get(':id')
    async getTaskById(@Param('id') id: string) {
        const taskForm = await this.taskService.getTaskById(Number(id))
        if (!taskForm) throw new NotFoundException('Task do not exist')
        return taskForm
    }
    @Delete(':id')
    async deleteTaskById(@Param('id') id: string) {
        try {
            return await this.taskService.deleteTask(Number(id))
        } catch (error) {
            throw new NotFoundException("Task do not exist")
        }
    }
    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() data: Task) {
        try {
            return await this.taskService.updateTask(Number(id), data)
        } catch (error) {
            throw new NotFoundException("Task do not exist")
        }
    }
}