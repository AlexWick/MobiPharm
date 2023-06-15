const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

const formController = require('./src/controllers/formController');
const dataController = require('./src/controllers/dataController');

// Initialize Firebase
const firebaseConfig = require('./src/firebase/firebaseConfig');
firebase.initializeApp(firebaseConfig);

const app = express();
const port = process.env.PORT || 3000;

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up public directory
app.use(express.static(path.join(__dirname, 'src/public')));

// Set up routes
app.post('/form', formController.submitForm);
app.get('/data', dataController.getData);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
