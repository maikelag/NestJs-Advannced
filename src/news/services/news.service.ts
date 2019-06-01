import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from '../entities/news.entity';
import { Repository } from 'typeorm';
import { NewsDTO } from '../models/news.dto';
import { User } from '@app/security/users/user.entity';
import { VoteNews } from '../entities/vote-news.entity';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(VoteNews)
    private readonly voteNewsRepository: Repository<VoteNews>,
  ) {}

  async findNews(): Promise<News[]> {
    const newsFinded = await this.newsRepository.find({
      relations: ['author', 'voteNews', 'comments'],
      order: { createdAt: 'DESC' },
    });
    const arrToSend: any = newsFinded;
    for (const [index, value] of arrToSend.entries()) {
      arrToSend[index].voteNews = await this.countVotes(value.id);
      arrToSend[index].comments = value.comments.length;
    }
    return arrToSend;
  }

  findNews2(): Promise<News[]> {
    return this.newsRepository.find();
  }

  async findOneNews(id: number): Promise<News> {
    const newsFinded = await this.newsRepository.findOne({
      where: { id },
      relations: ['author', 'comments'],
    });
    const commentsOfNews = await this.commentRepository.find({
      where: { news: id },
      relations: ['voteComment'],
    });
    newsFinded.comments = commentsOfNews;

    return newsFinded;
  }

  async createNews(news: NewsDTO, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const newsToCreate = await this.newsRepository.create({
      ...news,
      author: user,
    });
    return await this.newsRepository.save(newsToCreate);
  }

  async deleteNews(id: number, userId: number) {
    const newsToDelete = await this.newsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!newsToDelete) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    if (newsToDelete.author.id !== userId) {
      throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
    }
    await this.newsRepository.delete({ id });
    return newsToDelete;
  }

  async updateNews(idNews: number, newsToUpdate: NewsDTO) {}

  async voteNews(vote, newsId, userId) {
    const user = await this.userRepository.findOne(userId);
    const news = await this.newsRepository.findOne({
      where: { id: newsId },
      relations: ['author', 'voteNews', 'comments'],
    });
    const voteToCreate = await this.voteNewsRepository.create({
      userId: user,
      newsId: news,
      ...vote,
    });
    await this.voteNewsRepository.save(voteToCreate);
    const voOfNews = await this.countVotes(newsId);
    const objToSend: any = news;
    objToSend.voteNews = voOfNews;
    objToSend.comments = news.comments.length;
    return objToSend;
  }

  async countVotes(newsId: number) {
    const arr = { positivos: 0, negativos: 0 };
    const votes = await this.voteNewsRepository.find({ where: { newsId } });
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
