import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from '../entities/news.entity';
import { Repository } from 'typeorm';
import { NewsDTO } from '../models/news.dto';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>,
      ) {}

      async findNews(): Promise<News[]> {
          const newsFinded = await this.newsRepository.find();
          return newsFinded;
      }

      async findOneNews(id: number): Promise<News> {
        const newsFinded = await this.newsRepository.findOne(id, {relations: ['author, comments']});
        return newsFinded;
      }

      async createNews() {}

      async deleteNews(id: number) {}

      async updateNews(idNews: number, newsToUpdate: NewsDTO) {}

      async voteNews() {}
}
