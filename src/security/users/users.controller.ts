import { Controller, Get, Post, Delete, Put, Body, Param, UseGuards } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { User } from './user.entity';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard('bearer'))
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post()
    createUser(@Body() user: User): Promise<User> {
        return this.usersService.createUser(user);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: number) {
        return this.usersService.removeUser(id);
    }

    @Post('/login')
    loginUser(@Body() user: User) {
        return this.usersService.login(user);
    }

}
