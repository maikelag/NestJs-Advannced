import { Controller, Get, Post, Delete, Put, Body, Param, UseGuards } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/shared/guards/auth.guard';

import { User } from './user.entity';
import { UsersService } from './user.service';
import { UserDecorator } from '@app/shared/decorators/user.decorator';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    // @UseGuards(new AuthGuard())
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

    @Get('/whoiam')
    @UseGuards(new AuthGuard())
    whoIAm(@UserDecorator() user): Promise<User> {
        return this.usersService.whoIAm(user.id);
    }

}
