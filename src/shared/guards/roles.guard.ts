import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { RoleRO } from '../../security/roles/role.dto';
import { UserRO } from '../../security/users/user.dto';
import { Role } from 'src/security/roles/role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const perm = this.reflector.get<string[]>('permissions', context.getHandler());
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    const userSec: any = await this.validateToken(
      request.headers.authorization,
    );
    request.user = userSec.user;

    const user = request.user;
    const hasRole = () =>
      user.roles.some(role => !!roles.find(item => item === role.role));
    return user && user.roles && this.userHasPermission(request.user, perm[0]);
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
    }
    const token = auth.split(' ')[1];
    try {
      const decodeToken = await jwt.verify(token, process.env.SECRET);
      return decodeToken;
    } catch (error) {
      throw new HttpException('Token ERROR', HttpStatus.FORBIDDEN);
    }
  }

  hasRole(user, roles: string[]): boolean {
    const hasRole2 = () =>
      user.roles.some(role2 => !!roles.find(item => item === role2.role));
    return hasRole2();
  }

  roleHasPermission(role: Role, permission: string) {
    return role.permissions.some(el => el.permission === permission);
  }

  userHasPermission(user: UserRO, permission: string) {
    let flag = false;
    let i = 0;
    while (!flag && i < user.roles.length) {
      if (this.roleHasPermission(user.roles[i], permission)) {
        flag = true;
      }
      i++;
    }
    return flag;
  }
}
