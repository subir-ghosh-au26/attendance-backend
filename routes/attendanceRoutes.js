// backend/routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const cloudinary = require('../config/cloudinary');

router.post('/', async (req, res) => {
    try {
        const { name, mobile, batch, image } = req.body;
        if (!image) {
            return res.status(400).json({ message: 'No image data provided' });
        }

        const uploadResponse = await cloudinary.uploader.upload(image, {
            upload_preset: 'attendance_app',
        });
        const newAttendance = await Attendance.create({
            name,
            mobile,
            batch,
            image: uploadResponse.secure_url
        });
        res.status(201).json({ message: 'Attendance recorded successfully', data: newAttendance });
    } catch (error) {
        console.error('Error recording attendance', error);
        res.status(500).json({ message: 'Error recording attendance', error: error });
    }
});

router.get('/', async (req, res) => {
    try {
        const attendances = await Attendance.findAll();
        res.status(200).json(attendances);
    } catch (error) {
        console.error('Error fetching attendances', error);
        res.status(500).json({ message: 'Error fetching attendances' });
    }
});

module.exports = router;