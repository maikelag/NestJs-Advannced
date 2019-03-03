import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { Role } from 'src/security/roles/role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    if (!roles) {
      return true;
    }
    if (!request.headers.authorization) {
      return false;
    }
    const userSec: any = await this.validateToken(
      request.headers.authorization,
    );
    request.user = userSec.user;

    const user = request.user;
    const hasRole = () => user.roles.some((role) => !!roles.find((item) => item === role.role));
    return user && user.roles && hasRole();
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
    const hasRole2 = () => user.roles.some((role2) => !!roles.find((item) => item === role2.role));
    return hasRole2();
  }
}
