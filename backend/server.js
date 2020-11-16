const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const carRoutes = require('./routes/api/car.routes');
const orderRoutes = require('./routes/api/order.routes');
const helmet = require('helmet');
const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

/* API ENDPOINTS */
app.use('/api', carRoutes);
app.use('/api', orderRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ data: 'Not found...' });
});

// const db = process.env.DB;

// mongoose
//   .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));


// mongoose.connect(db);

process.env.NODE_ENV === 'production' ?
  mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }) :
  mongoose.connect('mongodb://localhost:27017/3d-printedCars', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});