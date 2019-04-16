import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { UserDecorator } from '@app/shared/decorators/user.decorator';
import { AuthGuard } from '@app/shared/guards/auth.guard';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get('/news/:idnews')
    findCommentOfNews(@Param('idnews') idNews: number) {
        return this.commentService.findCommentsOfNews(idNews);
    }

    @Post('/news/:idnews')
    @UseGuards(new AuthGuard())
    createComment(@Param('idnews') idNews: number, @Body() commentDTO, @UserDecorator() user) {
        return this.commentService.createComment(commentDTO, user.id, idNews);
    }
}
