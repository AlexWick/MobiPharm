const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const nodemailer = require('nodemailer');
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

exports.sendEmail = functions.firestore
    .document('prescriptions/{prescriptionId}')
    .onCreate((snap, context) => {
        const prescription = snap.data();

        const mailOptions = {
            from: '"Prescription Form" <' + gmailEmail + '>',
            to: prescription.pharmacyEmail,
            subject: 'New Prescription Request',
            html: `
                <p><b>Ailment:</b> ${prescription.ailment}</p>
                <p><b>Name:</b> ${prescription.name}</p>
                <p><b>Age:</b> ${prescription.age}</p>
                <p><b>Email:</b> ${prescription.email}</p>
                <p><b>Phone:</b> ${prescription.phone}</p>
                <h4>Symptoms:</h4>
                <p><b>Headache:</b> ${prescription.headache}</p>
                <p><b>Cough:</b> ${prescription.cough}</p>
                <p><b>Sore Throat:</b> ${prescription.soreThroat}</p>
                <p><b>Fever:</b> ${prescription.fever}</p>
                <p><b>Nausea:</b> ${prescription.nausea}</p>
            `
        };

        return mailTransport.sendMail(mailOptions)
            .then(() => console.log('New prescription request sent to:', prescription.pharmacyEmail))
            .catch(error => console.error('There was an error while sending the email:', error));
    });
