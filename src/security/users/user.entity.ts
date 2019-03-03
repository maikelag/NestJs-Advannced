import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn() id: number;

    @Column({length: 160})
    username: string;

    @Column({length: 100})
    password: string;

    @ManyToMany(type => Role, role => role.users, { cascade: true })
    @JoinTable()
    roles: Role[];

}
