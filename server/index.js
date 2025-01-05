const express = require('express'); // import express
const cors = require('cors');
const app = express(); // create express app instance


require('dotenv').config(); // Corrected: import environment variables
const port = process.env.PORT || 3000; // set port to environment variable or 3000

app.use(express.json()); // parse incoming request body in JSON format
app.use(cors()); // Enable cors middleware


// Moved dbConnect before app.listen to ensure DB connection before server starts
const dbConnect = require('./config/database'); // import database connection
dbConnect(); // connect to database






app.listen(port, () => {
    console.log(`server started at ${port}`);
}); // start express server on port 3000