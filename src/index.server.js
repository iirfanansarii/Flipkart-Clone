// import
const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
// environment variable or constants
env.config();

// mongodb connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.9l86r.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log('Database Connected');
  });

// create app
const app = express();

// cors
app.use(cors());
// middleware to show static files on browser :Npt working
const path = require('path');

app.use('/public', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static('uploads'));

// middleware to pass data on payload
app.use(express.json());

// admin routes
const adminRoutes = require('./routes/admin/adminRoutes');

app.use('/api', adminRoutes);

// user routes
const userRoutes = require('./routes/userRoutes');

app.use('/api', userRoutes);

// category routes
const categoriesRoutes = require('./routes/categoriesRoutes');

app.use('/api', categoriesRoutes);

// product routes
const productsRoutes = require('./routes/productsRoutes');

app.use('/api', productsRoutes);

// cart routes
const cartRoutes = require('./routes/cartRoutes');

app.use('/api', cartRoutes);

// listen app
app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
