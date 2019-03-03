import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth2/auth.module';
import { SecurityModule } from './security/security.module';
import { TvShowModule } from './tv-show/tv-show.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, SecurityModule, TvShowModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
