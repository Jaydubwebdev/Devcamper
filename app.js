const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

// Load Env Variables
dotenv.config({ path: './config/config.env' });

// Connect to Database
connectDB();

// Route Files
const bootcamps = require('./routes/bootcamps');

// Initialize Express App
const app = express();

// Dev Logging Middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

// Port Open
const PORT = process.env.PORT || 5000;
const server = app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server and Exit Process
    server.close(() => {
        process.exit(1);
    });
})