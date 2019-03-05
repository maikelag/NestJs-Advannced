import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { TvShowService } from './tv-show.service';
import { TvShow } from './tv-show.entity';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Permissions } from '../shared/decorators/permission.decorator';
import { PermissionList } from '../shared/permissions.enum';
import { TvShowDTO } from './tv-show.dto';

@Controller('tv-shows')
export class TvShowController {
  constructor(private readonly tvShowService: TvShowService) {}

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('perpage') perpage: number,
  ): Promise<TvShow[]> {
    return this.tvShowService.findAll(perpage, page);
  }

  @Get('/:id')
  findTvShow(@Param('id') idTvShow: number) {
    return this.tvShowService.findTvShow(idTvShow);
  }

  @UseGuards(RolesGuard)
  @Permissions(PermissionList.WRITE_TV_SHOWS)
  @UsePipes(new ValidationPipe())
  @Post()
  createTvShow(@Body() tvShow: TvShowDTO) {
    return this.tvShowService.createTvShow(tvShow);
  }

  @Delete('/:id')
  removeTvShow(@Param('id') idTvShow: number) {
    return this.tvShowService.removeTvShow(idTvShow);
  }
}
