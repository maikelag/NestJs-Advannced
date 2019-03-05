import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tv-shows')
export class TvShow {
    @PrimaryGeneratedColumn() id: number;

    @Column({length: 160})
    name: string;

    @Column({length: 160})
    description: string;

    @Column()
    scoring: number;

    @Column({nullable: true})
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

}
