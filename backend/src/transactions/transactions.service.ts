import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity, TransactionType } from './transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async findAll(month?: number, year?: number) {
  const now = new Date();

  const selectedMonth = month ?? now.getMonth() + 1;
  const selectedYear = year ?? now.getFullYear();

  return this.transactionRepository
    .createQueryBuilder('transaction')
    .leftJoinAndSelect('transaction.category', 'category')
    .where(
      'EXTRACT(MONTH FROM transaction.date) = :month',
      { month: selectedMonth },
    )
    .andWhere(
      'EXTRACT(YEAR FROM transaction.date) = :year',
      { year: selectedYear },
    )
    .orderBy('transaction.date', 'DESC')
    .getMany();
}

  create(data: { amount: number; note?: string; date: string; type: TransactionType; categoryId: string }) {
    const transaction = this.transactionRepository.create(data);
    return this.transactionRepository.save(transaction);
  }

  update(id: string, data: Partial<{ amount: number; note: string; date: string; type: TransactionType; categoryId: string }>) {
    return this.transactionRepository.update(id, data);
  }

  softDelete(id: string) {
    return this.transactionRepository.softDelete(id);
  }
}