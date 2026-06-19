import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { TransactionType } from '../lib/services/transaction.service'
import { getTransactions, createTransaction } from '../lib/services/transaction.service'
import { getCategories, createCategory } from '../lib/services/category.service'

export const Route = createFileRoute('/')({
  component: TambahPage,
})

const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

const IconTrendUp = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
)
const IconTrendDown = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
  </svg>
)
const IconWallet = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 3H8l-2 4h12l-2-4z"/><circle cx="17" cy="13" r="1"/>
  </svg>
)
const IconPlus = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)
const IconTag = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
)
const IconCalendar = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

function TambahPage() {
  const now = new Date()
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(now.getFullYear())

  const queryClient = useQueryClient()
  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions', selectedMonth, selectedYear],
    queryFn: () => getTransactions(selectedMonth, selectedYear),
  })
  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: getCategories })

  const [form, setForm] = useState({ amount: '', note: '', date: '', type: 'expense' as TransactionType, categoryId: '' })
  const [newCategory, setNewCategory] = useState('')
  const [showCatForm, setShowCatForm] = useState(false)

  const createTx = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      setForm({ amount: '', note: '', date: '', type: 'expense', categoryId: '' })
    }
  })
  const createCat = useMutation({
    mutationFn: ({ name }: { name: string }) => createCategory(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      setNewCategory('')
      setShowCatForm(false)
    }
  })

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
  const balance = totalIncome - totalExpense

  const inputCls = "w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-white transition placeholder:text-zinc-400"

  return (
    <div className="flex flex-col gap-5">

      {/* Filter Bulan dan Tahun */}
      <div className="flex items-center gap-3 bg-white rounded-xl border border-zinc-100 shadow-sm px-4 py-3">
        <span className="text-indigo-400 flex-shrink-0">
          <IconCalendar />
        </span>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="flex-1 text-sm font-medium text-zinc-700 bg-transparent outline-none cursor-pointer"
        >
          {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
        </select>
        <div className="w-px h-5 bg-zinc-200" />
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="text-sm font-medium text-zinc-700 bg-transparent outline-none cursor-pointer"
        >
          {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-zinc-400 font-medium">Balance</p>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center ${balance >= 0 ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-400'}`}>
              <IconWallet />
            </span>
          </div>
          <p className={`text-base font-bold tracking-tight ${balance >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {fmt(balance)}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-zinc-400 font-medium">Income</p>
            <span className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <IconTrendUp />
            </span>
          </div>
          <p className="text-base font-bold text-emerald-600 tracking-tight">{fmt(totalIncome)}</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-zinc-400 font-medium">Expense</p>
            <span className="w-7 h-7 rounded-full bg-red-50 text-red-400 flex items-center justify-center">
              <IconTrendDown />
            </span>
          </div>
          <p className="text-base font-bold text-red-500 tracking-tight">{fmt(totalExpense)}</p>
        </div>
      </div>

      {/* Tombol Kategori */}
      <button
        onClick={() => setShowCatForm(!showCatForm)}
        className="self-start flex items-center gap-1.5 text-xs font-medium text-indigo-600 border border-indigo-200 bg-indigo-50 rounded-full px-4 py-2 hover:bg-indigo-100 transition"
      >
        <IconTag />
        Kelola Kategori
      </button>

      {/* Add Category Form */}
      {showCatForm && (
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Tambah Kategori</p>
          <div className="flex gap-2">
            <input
              className={inputCls}
              placeholder="Nama kategori"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && newCategory && createCat.mutate({ name: newCategory })}
            />
            <button
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition flex items-center gap-1.5 whitespace-nowrap"
              onClick={() => newCategory && createCat.mutate({ name: newCategory })}
            >
              <IconPlus />
              Tambah
            </button>
          </div>
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {categories.map(c => (
                <span key={c.id} className="text-xs bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-full">{c.name}</span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Transaction */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Tambah Transaksi</p>
        <div className="flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2">
            <input className={inputCls} placeholder="Jumlah (Rp)" type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
            <input className={inputCls} type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          </div>
          <input className={inputCls} placeholder="Catatan (opsional)" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
          <div className="grid grid-cols-2 gap-2">
            <div className="flex rounded-xl border border-zinc-200 overflow-hidden">
              <button
                type="button"
                onClick={() => setForm({ ...form, type: 'expense' })}
                className={`flex-1 text-sm font-medium py-2.5 transition ${form.type === 'expense' ? 'bg-red-500 text-white' : 'bg-white text-zinc-500 hover:bg-zinc-50'}`}
              >
                Keluar
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, type: 'income' })}
                className={`flex-1 text-sm font-medium py-2.5 transition ${form.type === 'income' ? 'bg-emerald-500 text-white' : 'bg-white text-zinc-500 hover:bg-zinc-50'}`}
              >
                Masuk
              </button>
            </div>
            <select className={inputCls} value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })}>
              <option value="">Pilih kategori</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <button
            className="w-full py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!form.amount || !form.date || !form.categoryId || createTx.isPending}
            onClick={() => createTx.mutate({ amount: Number(form.amount), note: form.note, date: form.date, type: form.type, categoryId: form.categoryId })}
          >
            <IconPlus />
            {createTx.isPending ? 'Menyimpan...' : 'Simpan Transaksi'}
          </button>
        </div>
      </div>

    </div>
  )
}