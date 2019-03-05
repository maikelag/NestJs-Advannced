import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TvShow } from './tv-show.entity';
import { TvShowDTO } from './tv-show.dto';

@Injectable()
export class TvShowService {
  constructor(
    @InjectRepository(TvShow)
    private readonly tvShowRepository: Repository<TvShow>,
  ) {}

  async findAll(perpage: number, page: number, newest?: boolean) {
    const tvShows = await this.tvShowRepository.find({
      take: perpage,
      skip: perpage * (page - 1),
    });
    return tvShows;
  }

  async findTvShow(id: number) {
    const tvShow = await this.tvShowRepository.findOne({where: {id}});
    if (!tvShow) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return tvShow;
  }

  async createTvShow(tvShow: TvShowDTO) {
    return this.tvShowRepository.save(tvShow);
  }

  async removeTvShow(id: number) {
    const tvShowToDelete = await this.tvShowRepository.findOne({ where: { id } });
    return this.tvShowRepository.remove(tvShowToDelete);
  }
}
