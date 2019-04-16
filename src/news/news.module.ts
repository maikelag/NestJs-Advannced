import { Module } from '@nestjs/common';
import { NewsController } from './controllers/news.controller';
import { NewsService } from './services/news.service';
import { CommentController } from './controllers/comment.controller';
import { CommentService } from './services/comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteComment } from './entities/vote-comment.entity';
import { VoteNews } from './entities/vote-news.entity';
import { News } from './entities/news.entity';
import { Comment } from './entities/comment.entity';
import { User } from '@app/security/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News, Comment, VoteComment, VoteNews, User])],
  controllers: [NewsController, CommentController],
  providers: [NewsService, CommentService],
})
export class NewsModule {}
