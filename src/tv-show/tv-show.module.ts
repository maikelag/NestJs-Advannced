import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvShowController } from './tv-show.controller';
import { TvShowService } from './tv-show.service';
import { TvShow } from './tv-show.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TvShow])],
  controllers: [TvShowController],
  providers: [TvShowService],
})
export class TvShowModule {}
