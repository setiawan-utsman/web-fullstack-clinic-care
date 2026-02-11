# Clinic Care - Backend Server

Backend server sederhana berbasis **Express.js** untuk mendukung fungsionalitas aplikasi Clinic Care.

## 🔧 Fitur Backend

- **Rest API**: Endpoint untuk mengelola data klinik, kategori, dan booking.
- **Search Logic**: Pencarian case-insensitive pada nama klinik dan nama pasien.
- **Persistence**: Menggunakan file JSON (`data.json`) sebagai database sementara (mock).
- **Static File Serving**: Menyediakan aset gambar klinik melalui folder `/assets`.
- **CORS Enabled**: Mendukung akses dari berbagai origin frontend.

## 🛠️ Stack Teknologi

- **Node.js**: Runtime environment.
- **Express.js**: Framework web backend.
- **Cors**: Middleware keamanan untuk cross-origin requests.

## 📡 Endpoint API

- `GET /api/clinics`: Mengambil semua data klinik atau mencari berdasarkan query `?name=...`.
- `GET /api/clinics/:id`: Mengambil detail lengkap satu klinik.
- `GET /api/categories`: Mengambil daftar kategori klinik.
- `GET /api/bookings`: Mengambil daftar booking atau mencari berdasarkan query `?name=...`.
- `POST /api/bookings`: Membuat data booking baru.

## 🚀 Cara Menjalankan

1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan server:
   ```bash
   node index.js
   ```
   Server secara default akan berjalan di `http://localhost:3002`.
