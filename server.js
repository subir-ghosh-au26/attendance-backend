// backend/server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const { connectDB } = require('./config/database');
const { authenticate, authorize } = require('./middleware/authMiddleware');
const attendanceRoutes = require('./routes/attendanceRoutes');
const batchRoutes = require('./routes/batchRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/attendances', authenticate, attendanceRoutes);
app.use('/api/batches', authenticate, batchRoutes); // Protected route

app.listen(port, () => console.log(`Server is running on port ${port}`));