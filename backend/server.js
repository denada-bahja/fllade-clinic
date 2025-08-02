const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const path = require ("path")
require('dotenv').config()

// Routes
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute')
const contactRoute = require('./routes/contactRoute')
const serviceRoute = require('./routes/serviceRoute')
const bookingRoute = require('./routes/bookingRoute')

const app = express()

// CORS - lejo lidhjen nga frontend 
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL,
  exposedHeaders: ["set-cookie"],
}))

// Session
app.use(session({
  secret: "This will be secret",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));


// Middleware për JSON
app.use(express.json({ limit: "1000mb", extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB not connected " + err))

  //therritja e route
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/contact', contactRoute);
app.use('/services', serviceRoute);
app.use('/api/bookings', bookingRoute)

// Start server
const PORT = process.env.BACKEND_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server created`);
});




