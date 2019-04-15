import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../security/users/user.entity';
import { Comment } from './comment.entity';
import { VoteNews } from './vote-news.entity';

@Entity('news')
export class News {
    @PrimaryGeneratedColumn() id: number;

    @Column({length: 160})
    title: string;

    @Column({length: 2000, nullable: true})
    description: string;

    @Column({nullable: true})
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column({length: 2000, nullable: true})
    category: string;

    @ManyToOne(type => User, user => user.news)
    author: User;

    @OneToMany(type => Comment, comment => comment.news)
    comments: Comment[];

    @OneToMany(type => VoteNews, vn => vn.newsId)
    voteNews: VoteNews[];
}
