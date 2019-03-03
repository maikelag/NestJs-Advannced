import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';

import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {

    constructor(private readonly roleService: RoleService) {}

    @Get()
    findAll(): Promise<Role[]> {
        return this.roleService.findAll();
    }

    @Post()
    createUser(@Body() user: Role): Promise<Role> {
        return this.roleService.createUser(user);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: number) {
        return this.roleService.removeUser(id);
    }

}
