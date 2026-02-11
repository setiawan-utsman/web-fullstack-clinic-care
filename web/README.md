# Clinic Care - Frontend Web

Halaman ini berisi frontend dari aplikasi Clinic Care, dibangun menggunakan **React** dan **TypeScript** dengan fokus pada performa dan pengalaman pengguna (UX) yang premium.

## ✨ Fitur Frontend

- **Landing Page (Beranda)**: Antarmuka modern dengan banner interaktif dan pencarian cepat.
- **Integrasi TanStack Query**: Manajemen state server yang efisien untuk pengambilan data klinik dan booking.
- **Form Booking Lanjut**: 
    - Validasi Client-side menggunakan `React Hook Form`.
    - Field data lengkap: Nama, No HP, Jenis Kelamin, Tanggal Lahir, & Alamat.
    - Reset otomatis saat modal ditutup/batal.
- **Halaman Layanan**:
    - Daftar booking pasien dengan pencarian debounced.
    - Filter berdasarkan nama pasien.
    - Perhitungan usia otomatis di sisi client.
- **Navigasi Global**: Pengaturan path yang rapi dengan `React Router`.
- **Styling**: Menggunakan Tailwind CSS 4 untuk desain yang ringan dan modern.

## 🛠️ Stack Teknologi

- **React 19**: Library UI terbaru.
- **Vite**: Build tool super cepat.
- **TypeScript**: Menjamin keamanan tipe data.
- **React Router 7**: Manajemen routing aplikasi.
- **TanStack Query (v5)**: Data fetching & caching.
- **React Hook Form**: Penanganan form yang ringan.
- **Sonner**: Toast notifications untuk feedback.
- **Lucide React**: Set icon yang konsisten.

## 🚀 Cara Menjalankan

1. Masuk ke direktori web:
   ```bash
   cd web
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

## 📁 Struktur Penting

- `src/components`: Berisi komponen UI mandiri dan komponen besar seperti `BookingModal`.
- `src/pages`: Berisi view utama aplikasi (`BerandaPage`, `LayananPage`).
- `src/services`: Layer komunikasi dengan backend menggunakan `Axios`.
- `src/type`: Definisi interface TypeScript global.
- `src/routes`: Konfigurasi Router aplikasi.
