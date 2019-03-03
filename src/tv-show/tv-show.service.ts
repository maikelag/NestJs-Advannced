import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TvShow } from './tv-show.entity';

@Injectable()
export class TvShowService {
  constructor(
    @InjectRepository(TvShow)
    private readonly tvShowRepository: Repository<TvShow>,
  ) {}

  async findAll(): Promise<TvShow[]> {
    return await this.tvShowRepository.find();
  }

  async createTvShow(tvShow: TvShow): Promise<TvShow> {
    return this.tvShowRepository.save(tvShow);
  }

  async removeTvShow(id: number) {
    const tvShowToDelete = await this.tvShowRepository.findOne({ where: { id } });
    return this.tvShowRepository.remove(tvShowToDelete);
  }
}
