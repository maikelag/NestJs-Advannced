import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/user.entity';
import { Permission } from '../permissions/permission.entity';

@Entity('Roles')
export class Role {
    @PrimaryGeneratedColumn() id: number;

    @Column({length: 160})
    role: string;

    @ManyToMany(type => User, user => user.roles)
    users: User[];

    @ManyToMany(type => Permission, permission => permission.roles)
    @JoinTable()
    permissions: Permission[];
}
