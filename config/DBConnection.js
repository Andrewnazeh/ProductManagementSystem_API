const mongoose = require('mongoose');

module.exports = DBConnect = () => mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log("Successfully connected to DB");
    }).catch((err) => {
        console.log("Failed to connect to DB", err);
    });