import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { News } from '../entities/news.entity';
import { User } from '@app/security/users/user.entity';
import { VoteComment } from '../entities/vote-comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(VoteComment)
    private readonly voteCommentRepository: Repository<VoteComment>,
  ) {}

  async findCommentsOfNews(newsId: number) {
    const commentsOfNews = await this.commentRepository.find({
      where: { news: newsId },
      relations: ['author'],
    });
    return commentsOfNews;
  }

  async createComment(comment, userId, newsId) {
    const user = await this.userRepository.findOne(userId);
    const news = await this.newsRepository.findOne(newsId);
    const commentToCreate = await this.commentRepository.create({
      ...comment,
      author: user,
      news,
    });
    return await this.commentRepository.save(commentToCreate);
  }

  async voteComment(vote, commentId, userId) {
    const user = await this.userRepository.findOne(userId);
    const comment = await this.commentRepository.findOne(commentId);
    const voteToCreate = await this.voteCommentRepository.create({
      userId: user,
      commentId: comment,
      ...vote,
    });
    return await this.voteCommentRepository.save(voteToCreate);
  }

  async countVotes(commentId: number) {
    const arr = { positivos: 0, negativos: 0 };
    const votes = await this.voteCommentRepository.find({
      where: { commentId },
    });
    votes.forEach(val => {
      if (val.vote === 'Positivo') {
        arr.positivos++;
      } else {
        arr.negativos++;
      }
    });
    return arr;
  }
}
