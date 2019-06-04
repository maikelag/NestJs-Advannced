import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CommentService } from '../services/comment.service';
import { NewsService } from '../services/news.service';
import { News } from '../entities/news.entity';
import { RolesGuard } from '@app/shared/guards/roles.guard';
import { Permissions } from '@app/shared/decorators/permission.decorator';
import { PermissionList } from '@app/shared/permissions.enum';
import { UserDecorator } from '@app/shared/decorators/user.decorator';
import { NewsModule } from '../news.module';

@Resolver('News')
export class NewsResolver {
  constructor(
    private newsService: NewsService,
    private commentService: CommentService,
  ) {}

  @Query()
  news(): Promise<News[]> {
    return this.newsService.findNews();
  }

  @Query()
  newsOneFind(@Args('idNews') idNews: number) {
    return this.newsService.findOneNews(idNews);
  }

  @Mutation()
  @UseGuards(RolesGuard)
  @Permissions(PermissionList.WRITE_NEWS)
  newsAdd(@Args('news') news: any, @Context('user') user) {
    return this.newsService.createNews(news, user.id);
  }

  @Mutation()
  @UseGuards(RolesGuard)
  @Permissions(PermissionList.WRITE_NEWS)
  newsDelete(@Args('idNews') id: number, @Context('user') user) {
    return this.newsService.deleteNews(id, user.id);
  }

  @Mutation()
  @UseGuards(RolesGuard)
  @Permissions(PermissionList.WRITE_NEWS)
  newsUpdate(@Args('idNews') idNews: number, @Args('newsUpdated') newsUpdated: any) {
    return this.newsService.updateNews(idNews, newsUpdated);
  }

  @Mutation()
  @UseGuards(RolesGuard)
  @Permissions(PermissionList.WRITE_NEWS)
  newsVote(@Args('newsVote') newsVote: any, @Context('user') user) {
    return this.newsService.voteNews({vote: newsVote.vote}, newsVote.id, user.id);
  }
}
