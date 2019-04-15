import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from '../roles/role.entity';
import { News } from '../../news/entities/news.entity';
import { Comment } from '../../news/entities/comment.entity';
import { Expose } from 'class-transformer';
import { VoteComment } from '@app/news/entities/vote-comment.entity';
import { VoteNews } from '@app/news/entities/vote-news.entity';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 160 })
  username: string;

  @Expose()
  @Column({ length: 100 })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToMany(type => Role, role => role.users, { cascade: true })
  @JoinTable()
  roles: Role[];

  @OneToMany(type => News, news => news.author)
  news: News[];

  @OneToMany(type => Comment, comment => comment.author)
  comments: Comment[];

  @OneToMany(type => VoteComment, vc => vc.userId, { cascade: true })
  voteComment: VoteComment[];

  @OneToMany(type => VoteNews, vn => vn.userId, { cascade: true })
  voteNews: VoteNews[];

  @BeforeInsert()
  async encryptPassword() {
    const genSalt = 5;
    this.password = await bcrypt.hash(this.password, genSalt, (err, hash) => {
      if (err) {
        return console.log(err);
      }
      return (this.password = hash);
    });
  }

  async comparePassword(passwordToCompare: string) {
    return await bcrypt.compare(passwordToCompare, this.password);
  }
}
