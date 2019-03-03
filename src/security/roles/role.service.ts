import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
            private readonly roleRepository: Repository<Role>) {}

    async findAll(): Promise<Role[]> {
        return await this.roleRepository.find();
    }

    async createUser(user: Role): Promise<Role> {
        return this.roleRepository.save(user);
    }

    async removeUser(id: number) {
        const userToDelete = await this.roleRepository.findOne({ where: { id }});
        return this.roleRepository.remove(userToDelete);
    }

}
