import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import TypeStoreView from '../types/TypeStoreView';
import StoreView from '../view/StoreView';
import User from './User';

@Entity('stores')
class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty({
    message: 'O campo Nome é obrigatório.',
  })
  @IsOptional()
  name: string;

  @Column()
  @IsNotEmpty({
    message: 'O campo Descrição é obrigatório.',
  })
  @IsOptional()
  description: string;

  @Column()
  @Length(2, 2, {
    message: 'Colque a sigla de 2 caracteres para o UF.',
  })
  @IsNotEmpty({
    message: 'O campo UF é obrigatório.',
  })
  @IsOptional()
  uf: string;

  @Column()
  @IsNotEmpty({
    message: 'O campo Cidade é obrigatório.',
  })
  @IsOptional()
  city: string;

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

  @ManyToOne(() => User, user => user.stores, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @BeforeInsert()
  private setCreatedAt(): void {
    this.createdAt = new Date();
  }

  public getView(): TypeStoreView {
    return StoreView.render(this);
  }
}

export default Store;
