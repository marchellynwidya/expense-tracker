import api from '../api'
import type { Category } from './category.service'

export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  amount: number
  note?: string
  date: string
  type: TransactionType
  categoryId: string
  category: Category
  createdAt: string
}

export const getTransactions = (
  month?: number,
  year?: number,
) =>
  api
    .get<Transaction[]>('/transactions', {
      params: {
        month,
        year,
      },
    })
    .then(r => r.data)
export const createTransaction = (data: { amount: number; note?: string; date: string; type: TransactionType; categoryId: string }) =>
  api.post<Transaction>('/transactions', data).then(r => r.data)
export const deleteTransaction = (id: string) => api.delete(`/transactions/${id}`)