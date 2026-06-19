import { createRootRoute, Outlet, Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/40 via-zinc-50 to-zinc-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-zinc-100 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-zinc-800 tracking-tight">Expense Tracker</h1>
            <p className="text-xs text-zinc-400 mt-0.5">Catat pengeluaran harianmu</p>
          </div>
          <nav className="flex items-center gap-1 bg-zinc-100 rounded-full p-1">
            <Link
              to="/"
              className="px-4 py-1.5 text-sm font-medium rounded-full transition"
              activeProps={{ className: 'bg-white shadow-sm text-indigo-600' }}
              inactiveProps={{ className: 'text-zinc-500 hover:text-zinc-700' }}
            >
              Tambah
            </Link>
            <Link
              to="/riwayat"
              className="px-4 py-1.5 text-sm font-medium rounded-full transition"
              activeProps={{ className: 'bg-white shadow-sm text-indigo-600' }}
              inactiveProps={{ className: 'text-zinc-500 hover:text-zinc-700' }}
            >
              Riwayat
            </Link>
          </nav>
        </div>
      </div>

      <div className="max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-6 py-6">
        <Outlet />
      </div>
    </div>
  )
}