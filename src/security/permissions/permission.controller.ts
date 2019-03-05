import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';

import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {

    constructor(private readonly permissionService: PermissionService) {}

    @Get()
    findAll(): Promise<Permission[]> {
        return this.permissionService.findAll();
    }

    @Post()
    createPermission(@Body() permission: Permission): Promise<Permission> {
        return this.permissionService.createPermission(permission);
    }

    @Get('/example')
    example() {
        return this.permissionService.fullPermmissionsAuto();
    }

    @Delete('/:id')
    removePermission(@Param('id') id: number) {
        return this.permissionService.removepermission(id);
    }

}
