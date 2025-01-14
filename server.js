require('dotenv').config();
const express = require('express');
const compression = require('compression');
const cors = require('cors');


const DBConnection = require('./config/DBConnection');
const Routers = require('./routers/indexRoute');
const errorHandler = require('./middlewares/errorHandling');



DBConnection();


const app = express();
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.use(compression());

Routers(app);

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
    const error = new Error('Resource not found');
    error.status = 404;
    next(error);
});

// Global error-handling middleware
app.use(errorHandler);



app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});