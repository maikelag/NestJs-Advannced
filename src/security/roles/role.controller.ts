import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';

import { Role } from './role.entity';
import { RoleService } from './role.service';
import { RoleDTO } from './role.dto';

@Controller('roles')
export class RoleController {

    constructor(private readonly roleService: RoleService) {}

    @Get()
    findAll(): Promise<Role[]> {
        return this.roleService.findAll();
    }

    @Post()
    createRole(@Body() role: RoleDTO): Promise<RoleDTO> {
        return this.roleService.createRole(role);
    }

    @Delete('/:id')
    removeRole(@Param('id') id: number) {
        return this.roleService.removeUser(id);
    }

    @Get('/:id')
    findOneRole(@Param('id') roleId: number) {
        return this.roleService.findOneRole(roleId);
    }

}
