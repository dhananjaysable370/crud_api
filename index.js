const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const router = require("./routes/userRoute.js");

const app = express();

// Load environment variables from .env file as early as possible
dotenv.config();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected successfully..");
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server listening on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((error) => {
        console.log("Failed to connect to the database.", error);
    });


// API Routes
app.use('/api/users', router);

// Middleware to handle undefined routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});


