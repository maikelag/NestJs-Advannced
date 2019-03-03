import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity('tv-shows')
export class TvShow {
    @PrimaryGeneratedColumn() id: number;

    @Column({length: 160})
    name: string;

    @Column({length: 160})
    description: string;

    @Column()
    scoring: number;

}
