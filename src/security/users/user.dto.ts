import { IsNotEmpty, IsArray, IsAlphanumeric, IsString } from 'class-validator';
import { Role } from '../roles/role.entity';
import { RoleDTO } from '../roles/role.dto';

export class UserRO {
  id?: string;
  username: string;
  roles: Role[];
}

// tslint:disable-next-line:max-classes-per-file
export class UserDTO {
  @IsNotEmpty()
  @IsAlphanumeric()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsArray()
  roles: RoleDTO[];
}

// tslint:disable-next-line:max-classes-per-file
export class UserAuthDTO {
  @IsNotEmpty()
  @IsAlphanumeric()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
