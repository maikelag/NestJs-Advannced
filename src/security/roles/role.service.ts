import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './role.entity';
import { RoleDTO } from './role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
            private readonly roleRepository: Repository<Role>) {}

    async findAll(): Promise<Role[]> {
        return await this.roleRepository.find({relations: ['permissions']});
    }

    async createRole(role: any): Promise<RoleDTO> {
        return this.roleRepository.save(role);
    }

    async removeUser(id: number) {
        const userToDelete = await this.roleRepository.findOne({ where: { id }});
        return this.roleRepository.remove(userToDelete);
    }

    async findOneRole(roleId: number): Promise<Role> {
        return this.roleRepository.findOne({where: {id: roleId}, relations: ['permissions']});
    }

}
