import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(contex: ExecutionContext): Promise<boolean> {
    const request = contex.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    console.log(request.headers.authorization)
    request.user = await this.validateToken(request.headers.authorization);
    request.user = request.user.user
    console.log(request.user)
    return true;
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
      const message = 'Token error: ' + (error.message || error.name);
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}
