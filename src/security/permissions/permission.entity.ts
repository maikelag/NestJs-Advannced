import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity('Permission')
export class Permission {
    @PrimaryGeneratedColumn() id: number;

    @Column({length: 160})
    permission: string;

    @ManyToMany(type => Role, role => role.permissions)
    roles: Role[];
}
