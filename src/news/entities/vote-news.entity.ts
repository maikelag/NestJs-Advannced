import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '@app/security/users/user.entity';
import { News } from './news.entity';

@Entity('vote_news')
export class VoteNews {
    @Column()
    vote: string;

    @ManyToOne(type => News, news => news.voteNews, {primary: true})
    newsId: News;

    @ManyToOne(type => User, user => user.voteNews, {primary: true})
    userId: User;
}
