const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRouter = require('./router/auth');

const app = express();
const path = require('path');


// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/',userRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));

// Basic Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;
mongoose.connect("mongodb+srv://adityakantiboina10:Rishi9826@cluster9826.kwxir.mongodb.net/Campus")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
  app.get('/login',(req,res) => {
    res.send('login from the server')
});



