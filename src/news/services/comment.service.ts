import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { News } from '../entities/news.entity';
import { User } from '@app/security/users/user.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}

      async findCommentsOfNews(newsId: number) {
        const commentsOfNews = await this.commentRepository.find({where: {news: newsId}, relations: ['author']});
        return commentsOfNews;
      }

      async createComment(comment, userId, newsId) {
        const user = await this.userRepository.findOne(userId);
        const news = await this.newsRepository.findOne(newsId);
        const commentToCreate = await this.commentRepository.create({ ...comment, author: user, news });
        return await this.commentRepository.save(commentToCreate);
      }

}
