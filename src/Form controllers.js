const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

// Handle form submission
exports.submitForm = (req, res) => {
  const { name, age, ailment } = req.body;

  // Check if all fields are present
  if (!name || !age || !ailment) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Save form data to Firebase database
  const db = firebase.database();
  db.ref('forms').push({
    name,
    age,
    ailment,
  })
  .then(() => {
    res.status(200).json({ message: 'Form submitted successfully' });
  })
  .catch(error => {
    res.status(500).json({ message: 'Failed to submit form', error });
  });
};
