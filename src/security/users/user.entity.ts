import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import * as bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';
import { Role } from '../roles/role.entity';
import { Expose } from 'class-transformer';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 160 })
  username: string;

  @Expose()
  @Column({ length: 100 })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToMany(type => Role, role => role.users, { cascade: true })
  @JoinTable()
  roles: Role[];

  /*
  @BeforeInsert()
  async hasPassword() {
    const user = this;
    bcrypt.hash(this.password, null, null, (err, hash) => {
      user.password = hash;
    });
  }
  */
}
