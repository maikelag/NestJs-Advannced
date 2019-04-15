import { Controller, Get } from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { News } from '../entities/news.entity';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get()
    findAll(): Promise<News[]> {
        return this.newsService.findNews();
    }
}
