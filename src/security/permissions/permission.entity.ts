import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity('Permission')
export class Permission {
    @PrimaryGeneratedColumn() id: number;

    @Column({length: 160})
    permission: string;

    @Column({length: 160})
    type: string;

    @ManyToMany(type => Role, role => role.permissions)
    roles: Role[];
}
