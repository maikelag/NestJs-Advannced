import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { AuthGuard } from '@app/shared/guards/auth.guard';
import { UserDecorator } from '@app/shared/decorators/user.decorator';
import { NewsDTO } from '../models/news.dto';
import { RolesGuard } from '@app/shared/guards/roles.guard';
import { Permissions } from '@app/shared/decorators/permission.decorator';
import { PermissionList } from '@app/shared/permissions.enum';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll() {
    return this.newsService.findNews();
  }

  @Get('/:id')
  findOne(@Param('id') idNews: number) {
    return this.newsService.findOneNews(idNews);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Permissions(PermissionList.WRITE_NEWS)
  createNews(@UserDecorator() user, @Body() data: NewsDTO) {
    return this.newsService.createNews(data, user.id);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Permissions(PermissionList.WRITE_NEWS)
  deleteNews(@Param('id') idNews: number, @UserDecorator() user: any) {
    return this.newsService.deleteNews(idNews, user.id);
  }

  @Post('/:idnews')
  @UseGuards(new AuthGuard())
  voteComment(
    @Param('idnews') idnews: number,
    @Body() vote,
    @UserDecorator() user,
  ) {
    return this.newsService.voteNews(vote, idnews, user.id);
  }
}
