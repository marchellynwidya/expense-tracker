import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CategoryEntity } from '../categories/categories.entity';
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('decimal', { precision: 15, scale: 2 })
  amount!: number;

  @Column({ nullable: true })
  note!: string;

  @Column({ type: 'date' })
  date!: string;

  @Column({ type: 'enum', enum: TransactionType })
  type!: TransactionType;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'categoryId' })
  category!: CategoryEntity;

  @Column()
  categoryId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}