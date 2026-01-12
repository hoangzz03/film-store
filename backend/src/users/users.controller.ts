import { Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { 

    }
    @Get() // GET /users or /users?role = value
    findAll() {
        return this.usersService.findAll();
    }
    @Get( '/plain')
    getAllUser() {
        return this.usersService.getAllUser();
    }

    @Get(':id') // GET /users/: id
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUserById(id)
    }

    @Post() // POST /users
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        const newUser = {
            ...createUserDto,
            role: 2
        }
        return this.usersService.create(newUser) 
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id)
    }
}

