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
  UseInterceptors,
  FileInterceptor,
  Put,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { TvShowService } from './tv-show.service';
import { TvShow } from './tv-show.entity';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Permissions } from '../shared/decorators/permission.decorator';
import { PermissionList } from '../shared/permissions.enum';
import { TvShowDTO } from './tv-show.dto';
import { extname, join } from 'path';

@Controller('tvshows')
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

  // @UseGuards(RolesGuard)
  // @Permissions(PermissionList.WRITE_TV_SHOWS)
  @UsePipes(new ValidationPipe())
  /*
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          req.body.image = req.body.title + extname(file.originalname);
          return cb(null, `${req.body.title}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  */
  @Post()
  createTvShow(@Body() tvShow: TvShowDTO) {
    return this.tvShowService.createTvShow(tvShow);
  }

  @Delete('/:id')
  removeTvShow(@Param('id') idTvShow: number) {
    return this.tvShowService.removeTvShow(idTvShow);
  }

  @Put('/:id')
  updateTvShow(@Param('id') idTvShow: number, @Body() tvShowUpdate: Partial<TvShowDTO>) {
    return this.tvShowService.updateTvShow(idTvShow, tvShowUpdate);
  }
}
