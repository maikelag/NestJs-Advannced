import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UsersService } from './user.service';
import { UsersController } from './users.controller';
import { Role } from '../roles/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
