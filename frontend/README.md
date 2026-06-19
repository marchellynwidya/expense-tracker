# Expense Tracker — Frontend

Aplikasi pencatat pengeluaran dan pemasukan harian berbasis web. Dibangun untuk membantu mencatat transaksi keuangan, mengelompokkannya ke dalam kategori, dan melihat ringkasan saldo per bulan.

## Fitur

- Tambah transaksi (pemasukan/pengeluaran) dengan jumlah, tanggal, catatan, dan kategori
- Ringkasan saldo, total pemasukan, dan total pengeluaran per bulan
- Filter transaksi berdasarkan bulan dan tahun
- Riwayat transaksi terpisah dari halaman input, dengan opsi hapus
- Pengelolaan kategori transaksi (tambah kategori baru)
- Tampilan responsif — menyesuaikan dari mobile hingga desktop

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool & dev server
- **TanStack Router** — file-based routing
- **TanStack Query** — data fetching & caching
- **Tailwind CSS v4** — styling
- **Axios** — HTTP client

## Struktur Proyek

```
src/
├── routes/
│   ├── __root.tsx       # Layout utama (header + navigasi)
│   ├── index.tsx        # Halaman "Tambah Transaksi" (/)
│   └── riwayat.tsx       # Halaman "Riwayat Transaksi" (/riwayat)
├── lib/
│   ├── api.ts            # Konfigurasi axios instance
│   └── services/
│       ├── transaction.service.ts
│       └── category.service.ts
└── main.tsx               # Entry point aplikasi
```

## Backend

Proyek ini membutuhkan backend terpisah yang dibangun dengan **NestJS + TypeORM + PostgreSQL**, berjalan secara default di `http://localhost:3002`.

Lihat repo backend: [expense-tracker](#) <!-- ganti # dengan link repo backend kamu -->

## Cara Menjalankan

1. Clone repo ini dan masuk ke foldernya
   ```bash
   git clone <url-repo-ini>
   cd expense-tracker-frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Pastikan backend sudah berjalan di `http://localhost:3002` (lihat README backend untuk setup database PostgreSQL)

4. Jalankan development server
   ```bash
   npm run dev
   ```

5. Buka [http://localhost:5173](http://localhost:5173) di browser

## Build untuk Production

```bash
npm run build
npm run preview
```

## Status

Proyek pembelajaran — masih dalam pengembangan aktif.
