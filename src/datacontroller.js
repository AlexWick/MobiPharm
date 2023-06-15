const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

// Get form data from Firebase database
exports.getData = (req, res) => {
  const db = firebase.database();
  const formsRef = db.ref('forms');

  formsRef.once('value', snapshot => {
    const forms = [];
    snapshot.forEach(childSnapshot => {
      const form = childSnapshot.val();
      form.id = childSnapshot.key;
      forms.push(form);
    });

    res.status(200).json({ forms });
  })
  .catch(error => {
    res.status(500).json({ message: 'Failed to get form data', error });
  });
};
