import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { join, dirname } from 'path';
import { unlink } from 'fs';
import { Image } from 'image-js';
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
      order: { createdAt: 'DESC' },
    });
    return tvShows;
  }

  async findTvShow(id: number) {
    const tvShow = await this.tvShowRepository.findOne({ where: { id } });
    if (!tvShow) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return tvShow;
  }

  async createTvShow(tvShow: TvShowDTO) {
    if (tvShow.image) {
      const nameOfImage = `tv-show-${ Date.now().toString()}.jpg`;
      await this.saveImage(tvShow.image, nameOfImage);
      tvShow.image = nameOfImage;
    }
    const tvShowToCreate = new TvShow();
    tvShowToCreate.title = tvShow.title;
    tvShowToCreate.description = tvShow.description;
    tvShowToCreate.scoring = tvShow.scoring;
    tvShowToCreate.actor = tvShow.actor;
    tvShowToCreate.image = tvShow.image;

    return this.tvShowRepository.save(tvShowToCreate);
  }

  async removeTvShow(id: number) {
    const tvShowToDelete = await this.tvShowRepository.findOne({
      where: { id },
    });
    if (tvShowToDelete.image) {
      unlink(join('./public', tvShowToDelete.image), err => {});
    }
    return this.tvShowRepository.remove(tvShowToDelete);
  }

  async updateTvShow(idTvShow: number, tvShow: Partial<TvShowDTO>) {
    let tvShowOld = await this.tvShowRepository.findOne({
      where: { id: idTvShow },
    });
    if (!tvShowOld) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    if (!tvShow.image) {
      tvShow.image = tvShowOld.image;
    }
    if (tvShow.image !== tvShowOld.image && tvShow.image) {
      const nameOfImage = tvShowOld.image;
      await this.saveImage(tvShow.image, nameOfImage);
      tvShow.image = nameOfImage;
    }
    await this.tvShowRepository.update({ id: idTvShow }, tvShow);
    tvShowOld = await this.tvShowRepository.findOne({
      where: { id: idTvShow },
    });

    return tvShowOld;
  }

  async saveImage(imag: string, name: string) {
    const imagen = imag.split(',');
    const buf = Buffer.from(imagen[1], 'base64');
    const imageLoaded = await Image.load(buf);
    return imageLoaded.save(join('public', name));
  }
}
