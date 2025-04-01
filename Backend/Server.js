const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // Loading environment variables

const app = express();

const taskRoutes = require("./routes/taskRoute");

const cors = require('cors');

// Middleware to log the request method and path
app.use((req, res, next) => {
    console.log("Path: " + req.path + " | Method: " + req.method);
    next();
});

app.use(express.json());
app.use(cors());

// Basic route for testing
/*app.get("/", (req, res) => {
    res.send("Hello world 3");
});*/

// DB CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("DB connected successfully and listening on port " + process.env.PORT);
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database: ", error);
        process.exit(1); // Exit process with failure
    });

console.log("MongoDB URI from .env:", process.env.MONGO_URI);

app.use("/api/tasks", taskRoutes);
