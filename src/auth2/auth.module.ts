
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpStrategy } from './strategy/http.strategy';
import { UsersService } from '../security/users/user.service';
import { UsersModule } from '../security/users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'bearer' }), UsersModule],
  providers: [HttpStrategy, AuthService, UsersService],
})
export class AuthModule {}
