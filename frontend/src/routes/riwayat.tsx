import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTransactions, deleteTransaction } from '../lib/services/transaction.service'

export const Route = createFileRoute('/riwayat')({
  component: RiwayatPage,
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
const IconTrash = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
)
const IconCalendar = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

function RiwayatPage() {
  const now = new Date()
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(now.getFullYear())

  const queryClient = useQueryClient()
  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions', selectedMonth, selectedYear],
    queryFn: () => getTransactions(selectedMonth, selectedYear),
  })

  const deleteTx = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['transactions'] })
  })

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

      {/* Transaction List */}
      <div>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Riwayat Transaksi</p>
        {transactions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-100 p-10 text-center">
            <p className="text-sm text-zinc-400">Belum ada transaksi bulan ini</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {transactions.map(t => (
              <div key={t.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm px-4 py-3 flex items-center gap-3 hover:border-zinc-200 transition">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${t.type === 'income' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-400'}`}>
                  {t.type === 'income' ? <IconTrendUp /> : <IconTrendDown />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-700 font-medium truncate">{t.note || t.category?.name}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{t.date} · {t.category?.name}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <p className={`text-sm font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {t.type === 'income' ? '+' : '−'}{fmt(Number(t.amount))}
                  </p>
                  <button
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-300 hover:text-red-400 hover:bg-red-50 transition"
                    onClick={() => deleteTx.mutate(t.id)}
                  >
                    <IconTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}