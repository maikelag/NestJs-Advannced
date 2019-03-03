import { Module } from '@nestjs/common';
import { RoleModule } from './roles/role.module';
import { PermissionModule } from './permissions/permission.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [UsersModule, RoleModule, PermissionModule],
})
export class SecurityModule {
}
