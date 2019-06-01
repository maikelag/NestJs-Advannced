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
import { Comment } from '../entities/comment.entity';
import { RolesGuard } from '@app/shared/guards/roles.guard';
import { PermissionList } from '@app/shared/permissions.enum';
import { Permissions } from '@app/shared/decorators/permission.decorator';

@Resolver('Comment')
export class CommentResolver {
  constructor(
    private newsService: NewsService,
    private commentService: CommentService,
  ) {}

  @Query()
  commentsFind(@Args('idNews') idNews: number): Promise<Comment[]> {
    return this.commentService.findCommentsOfNews(idNews);
  }

  @Mutation()
  @UseGuards(RolesGuard)
  @Permissions(PermissionList.WRITE_NEWS)
  commentCreate(@Args('commentNew') comment: any, @Context('user') user) {
    return this.commentService.createComment({comment: comment.comment}, comment.idNews, user.id);
  }

  @Mutation()
  @UseGuards(RolesGuard)
  @Permissions(PermissionList.WRITE_NEWS)
  commentVote(@Args('commentVote') commentVote: any, @Context('user') user) {
    return this.commentService.voteComment({comment: commentVote.comment}, commentVote.idComment, user.id)
  }

}
