import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionList } from '../../shared/permissions.enum';

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

    async fullPermmissionsAuto() {
        for (const i of Object.keys(PermissionList)) {
            const perm = await this.permissionRepository.findOne({where: {permission: PermissionList[i]}});
            if (!perm) {
                const permission = {
                    permission: PermissionList[i],
                };
                await this.permissionRepository.save(permission);
                console.log('Nuevo permiso creado ', PermissionList[i]);
            }
        }
    }

}
