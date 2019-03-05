import { Permission } from '../permissions/permission.entity';
import { User } from '../users/user.entity';
import { PermissionDTO } from '../permissions/permission.dto';

export class RoleRO {
    id?: string;
    role: string;
    permissions: Permission[];
    users: User[];
}

// tslint:disable-next-line:max-classes-per-file
export class RoleDTO {
    role: string;
    permissions?: PermissionDTO[];
}
