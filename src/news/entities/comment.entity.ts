import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinTable,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from '@app/security/users/user.entity';
import { News } from './news.entity';
import { VoteComment } from './vote-comment.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 2000 })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => News, news => news.comments)
  news: News;

  @ManyToOne(type => User, user => user.comments)
  author: User;

  @OneToMany(type => VoteComment, comment => comment.commentId)
  voteComment: VoteComment[];

  @ManyToOne(type => Comment, comm => comm.fatherComment)
  fatherComment: Comment;

}
