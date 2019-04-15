import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';
import { TvShowModule } from './tv-show/tv-show.module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LogginInterceptor } from './shared/loggin.interceptor';
import { NewsModule } from './news/news.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, SecurityModule, TvShowModule, NewsModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogginInterceptor,
    },
  ],
})
export class AppModule {}
