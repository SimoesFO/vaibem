import bcrypt from 'bcryptjs';
import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import TypeUserView from '../types/TypeUserView';
import UserView from '../view/UserView';
import Store from './Store';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty({
    message: 'O campo Nome é obrigatório.',
  })
  @IsOptional()
  name: string;

  @Column()
  @IsEmail({}, { message: 'Email inválido.' })
  @IsNotEmpty({
    message: 'O campo Email é obrigatório.',
  })
  @IsOptional()
  email: string;

  @Column()
  @Length(5, 20, {
    message: 'A senha deve ter entre $constraint1 e $constraint2 caracteres.',
  })
  @IsOptional()
  password: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Store, store => store.user, {
    cascade: true,
  })
  stores: Promise<Store[]>;

  @BeforeInsert()
  @BeforeUpdate()
  private hashPassword(): void {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  }

  @BeforeInsert()
  private setCreatedAt(): void {
    this.createdAt = new Date();
  }

  public getView(): TypeUserView {
    return UserView.render(this);
  }
}

export default User;
