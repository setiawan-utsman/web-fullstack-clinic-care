const express = require('express');
const cors = require('cors');
const path = require("path");

const app = express();
const port = 3002;

// Your clinic data
const data = require('./data.json');

// Middleware to parse JSON requests
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(cors({ origin: "*", credentials: true }));

// 1. API to search clinics by name (case insensitive)
app.get('/api/clinics', (req, res) => {
  const searchName = req.query.name?.toLowerCase();

  if (!searchName) {
    return res.json(data.clinics);
  }

  const filteredClinics = data.clinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchName)
  );

  res.json(filteredClinics);
});

// 2. API to get clinic details by ID
app.get('/api/clinics/:id', (req, res) => {
  const clinicId = parseInt(req.params.id);
  const clinic = data.clinics.find(c => c.id === clinicId);

  if (!clinic) {
    return res.status(404).json({ message: 'Clinic not found' });
  }

  res.json(clinic);
});

// 3. API to get unique clinic categories (types)
app.get('/api/categories', (req, res) => {
  const uniqueCategories = data.categories;
  res.json(uniqueCategories);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// Global list to store bookings
const bookings = [];

// 4. API to create a booking
app.post('/api/bookings', (req, res) => {
  const { NamaLengkap, NoHp, JenisKelamin, TanggalLahir, AlamatLengkap } = req.body;

  if (!NamaLengkap || !NoHp) {
    return res.status(400).json({ message: 'Nama Lengkap and NoHp are required' });
  }

  const newBooking = {
    id: bookings.length + 1,
    NamaLengkap,
    NoHp,
    JenisKelamin,
    TanggalLahir,
    AlamatLengkap
  };

  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

// 5. API to get the list of bookings
app.get('/api/bookings', (req, res) => {
  const searchName = req.query.name?.toLowerCase();

  if (!searchName) {
    return res.json(bookings);
  }

  const filteredBookings = bookings.filter(booking =>
    booking.NamaLengkap.toLowerCase().includes(searchName)
  );

  res.json(filteredBookings);
});
