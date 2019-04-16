import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { UserDecorator } from '@app/shared/decorators/user.decorator';
import { AuthGuard } from '@app/shared/guards/auth.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/news/:idnews')
  findCommentOfNews(@Param('idnews') idNews: number) {
    return this.commentService.findCommentsOfNews(idNews);
  }

  @Post('/news/:idnews')
  @UseGuards(new AuthGuard())
  createComment(
    @Param('idnews') idNews: number,
    @Body() commentDTO,
    @UserDecorator() user,
  ) {
    return this.commentService.createComment(commentDTO, user.id, idNews);
  }

  @Post('/:idcomment')
  @UseGuards(new AuthGuard())
  voteComment(
    @Param('idcomment') idcomment: number,
    @Body() vote,
    @UserDecorator() user,
  ) {
    return this.commentService.voteComment(vote, idcomment, user.id);
  }

  @Get('/:idcomment/votes')
  countVotes(@Param('idcomment') idcomment) {
    return this.commentService.countVotes(idcomment);
  }
}
