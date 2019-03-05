import { Role } from '../roles/role.entity';

export class PermissionRO {
    id: string;
    permmission: string;
    roles: Role[];
}

// tslint:disable-next-line:max-classes-per-file
export class PermissionDTO {
    id: string;
}
