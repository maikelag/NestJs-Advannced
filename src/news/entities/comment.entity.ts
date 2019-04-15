import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '@app/security/users/user.entity';
import { News } from './news.entity';
import { VoteComment } from './vote-comment.entity';

@Entity('comment')
export class Comment {
    @PrimaryGeneratedColumn() id: number;

    @Column({length: 2000})
    comment: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({length: 2000, nullable: true})
    category: string;

    @ManyToOne(type => News, news => news.comments)
    news: News;

    @ManyToOne(type => User, user => user.comments)
    author: User;

    @OneToMany(type => User, comment => comment.voteComment)
    voteComment: VoteComment;

}
