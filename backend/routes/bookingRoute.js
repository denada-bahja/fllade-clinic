const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');
const nodemailer = require('nodemailer');


router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: 'New Booking Appointment',
      text: `
New Booking:

Name: ${req.body.firstName} ${req.body.lastName}
Phone: ${req.body.phone}
Date: ${req.body.date}
Time: ${req.body.time}
Service: ${req.body.service}
Email: ${req.body.userEmail || 'N/A'}
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Booking saved and email sent successfully!' });
  } catch (err) {
    console.error('Booking or Email Error:', err);
    res.status(500).json({ message: 'Something went wrong while booking.' });
  }
});

module.exports = router;
