import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '@app/security/users/user.entity';
import { Comment } from './comment.entity';

@Entity('vote_comment')
export class VoteComment {
  @Column()
  vote: string;

  @ManyToOne(type => Comment, comm => comm.voteComment, { primary: true })
  commentId: Comment;

  @ManyToOne(type => User, user => user.voteComment, { primary: true })
  userId: User;
}
