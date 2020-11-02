const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const carRoutes = require('./routes/api/car.routes');

const app = express();
const session = require('express-session');

app.use(session({secret: '123456'}));
/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api', carRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ data: 'Not found...' });
});

const db = ('mongodb+srv://slawomir:energy2000@cluster0.rqbyt.mongodb.net/ShopItemsDB?retryWrites=true&w=majority');
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

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