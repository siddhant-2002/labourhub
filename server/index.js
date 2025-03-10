const express = require("express"); // import express
const cors = require("cors");
const app = express(); // create express app instance
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));


require("dotenv").config(); // Corrected: import environment variables
const port = process.env.PORT || 3000; // set port to environment variable or 3000

app.use(express.json()); // parse incoming request body in JSON format
app.use(cors()); // Enable cors middleware

// Moved dbConnect before app.listen to ensure DB connection before server starts
const dbConnect = require("./config/database"); // import database connection
dbConnect(); // connect to database

const labourRoutes = require("./routes/labour");
app.use("/", labourRoutes); // use labour routes for /labour endpoint

app.listen(port, () => {
  console.log(`server started at ${port}`);
}); // start express server on port 3000



// const express = require('express');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const axios = require('axios');
// const { Client } = require('twilio');

// dotenv.config();

// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));



// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });