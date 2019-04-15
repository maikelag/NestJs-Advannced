import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tv-shows')
export class TvShow {
    @PrimaryGeneratedColumn() id: number;

    @Column({length: 160})
    title: string;

    @Column({length: 2000, nullable: true})
    description: string;

    @Column({length: 250, nullable: true})
    actor: string;

    @Column()
    scoring: number;

    @Column({nullable: true})
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

}
