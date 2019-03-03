import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TvShowService } from './tv-show.service';
import { TvShow } from './tv-show.entity';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';

@Controller('tv-shows')
export class TvShowController {
  constructor(private readonly tvShowService: TvShowService) {}

  @Get()
  findAll(): Promise<TvShow[]> {
    return this.tvShowService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Post()
  createTvShow(@Body() tvShow: TvShow): Promise<TvShow> {
    return this.tvShowService.createTvShow(tvShow);
  }

  @Delete('/:id')
  removeTvShow(@Param('id') id: number) {
    return this.tvShowService.removeTvShow(id);
  }
}
