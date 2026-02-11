# Clinic Care - Fullstack Appointment System

Clinic Care adalah aplikasi manajemen booking klinik modern yang dibangun dengan arsitektur Fullstack. Aplikasi ini memungkinkan pengguna untuk mencari klinik, melihat detail klinik, dan melakukan pendaftaran (booking) pemeriksaan medis dengan antarmuka yang intuitif dan premium.

## 🚀 Fitur Utama

- **Pencarian Klinik**: Cari klinik berdasarkan nama dengan filter kategori yang responsif.
- **Detail Klinik**: Informasi mendalam tentang fasilitas, spesialis, dan ulasan klinik.
- **Sistem Booking Lanjut**: Form pendaftaran dengan validasi real-time dan field data diri lengkap.
- **Manajemen Booking (Layanan)**: Halaman khusus untuk melihat daftar booking, pencarian pasien, dan perhitungan usia otomatis.
- **Notifikasi Global**: Sistem toast notification menggunakan `Sonner` untuk feedback pengguna yang lebih baik.
- **Desain Premium**: Tampilan modern menggunakan Tailwind CSS dengan animasi halus dan responsif.

## 🛠️ Teknologi yang Digunakan

### Frontend (Web)
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 4 + Lucide React (Icons)
- **State & Data Fetching**: TanStack Query (React Query)
- **Form Management**: React Hook Form
- **Navigation**: React Router 7
- **UI Components**: Radix UI + Custom Components (Shadcn-like)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: JSON-based (Mock Data)
- **Middleware**: CORS, Express Static

## 📂 Struktur Folder Aplikasi

```text
clinic-care/
├── backend/            # Server Express.js
│   ├── assets/         # Aset statis (Gambar Klinik)
│   ├── data.json       # Database mock
│   ├── index.js        # Entry point backend
│   └── package.json    # Dependensi backend
├── web/                # Frontend React
│   ├── src/
│   │   ├── components/ # Komponen UI & Beranda
│   │   ├── pages/      # Halaman utama (Beranda, Layanan)
│   │   ├── services/   # Integrasi API (Service Layer)
│   │   ├── type/       # Definisi Type/Interface TS
│   │   └── main.tsx    # Entry point frontend
│   └── package.json    # Dependensi frontend
└── Readme.md           # Dokumentasi Utama
```

## ⚙️ Cara Menjalankan Aplikasi

Pastikan Anda sudah menginstal **Node.js** di sistem Anda.

### 1. Jalankan Backend
```bash
cd backend
npm install
node index.js
```
Server akan berjalan di `http://localhost:3002`.

### 2. Jalankan Frontend
Buka terminal baru:
```bash
cd web
npm install
npm run dev
```
Aplikasi web akan tersedia di `http://localhost:5173` (atau port lain yang muncul di terminal).

---

Dikembangkan dengan ❤️ sebagai solusi manajemen kesehatan digital.
