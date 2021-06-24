// dependencies
const express = require("express");
const routes = require("./routes/api")
const mongoose = require("mongoose")
var path = require('path');
// configure dotenv
require('dotenv').config();

// new express app
const app = express();

// define PORT
const PORT = process.env.PORT || 5000;

// serve static assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// configure middleware
app.use(express.urlencoded({ extended: true }, {limit: '50mb'}));
app.use(express.json({limit: '50mb'}));

// Add routes, both API and view
app.use(routes);

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')));
}

// // Connect to the local instance of mongoDB
// mongoose.connect("mongodb://localhost/point-intercept");

// Connect to atlas mongoDB
mongoose.connect(process.env.MONGODB_URI);

// start the server
app.listen(PORT, function () {
    console.log(`🌎 ==> API Server now listening on PORT ${PORT}!`);
});