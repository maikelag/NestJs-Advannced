import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import { User } from './user.entity';
import { Role } from '../roles/role.entity';
import { Permission } from '../permissions/permission.entity';
import { of } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async createUser(user: User): Promise<User> {
    const userToCreate = new User();
    userToCreate.username = user.username;
    userToCreate.password = user.password;

    user.roles.map(async r => {
        const roleFind = await this.rolesRepository.findOne({where: {id: r.id}});
        if (roleFind) {
            userToCreate.roles.push(roleFind);
        }
    });
    return await this.usersRepository.save(user);
  }

  async removeUser(id: number) {
    const userToDelete = await this.usersRepository.findOne({ where: { id } });
    return this.usersRepository.remove(userToDelete);
  }

  async findOneByToken(token: string) {
    const decodeToken: any = await jwt.verify(token, process.env.SECRET);
    const user = await this.usersRepository.findOne({
      where: { id: decodeToken.idUser },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async register(data: any) {
    const user = await this.usersRepository.create(data);
    await this.usersRepository.save(user);
    return user;
  }

  async login(data: any) {
    const { username, password } = data;
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['roles'],
    });
    if (!user || password !== user.password) {
      return new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }

    for (let i = 0; i < user.roles.length; i++) {
      const rsd = await this.rolesRepository.findOne({
        where: { id: user.roles[i].id },
        relations: ['permissions'],
      });
      user.roles[i] = rsd;
    }
    const idUser = user.id;

    const token = jwt.sign(
      {
        idUser,
        user,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );

    return { ...user, token };
  }
}
