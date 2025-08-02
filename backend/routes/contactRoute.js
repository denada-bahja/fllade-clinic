const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Ruaj mesazhin në DB
    const contact = new Contact({ name, email, message });
    await contact.save();
  } catch (err) {
    console.error("Error saving message:", err);
    return res.status(500).json({ error: "Failed to save message." });
  }

  // Konfiguro nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Gmail user
      pass: process.env.EMAIL_PASS  // App password
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New message from ${name}`,
    text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    // Dërgo email-in
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return res.status(200).json({ message: "Message saved and email sent!" });
  } catch (error) {
    console.error("Email send error:", error);
    // Mesazhi ruhet, por email dështoi
    return res.status(500).json({ error: "Failed to send email, but message saved." });
  }
});

module.exports = router;
