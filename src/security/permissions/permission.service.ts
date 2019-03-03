import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
            private readonly permissionRepository: Repository<Permission>) {}

    async findAll(): Promise<Permission[]> {
        return await this.permissionRepository.find();
    }

    async createPermission(permission: Permission): Promise<Permission> {
        return this.permissionRepository.save(permission);
    }

    async removepermission(id: number) {
        const permissionToDelete = await this.permissionRepository.findOne({ where: { id }});
        return this.permissionRepository.remove(permissionToDelete);
    }

}
