const express = require('express');
const http = require('http');
const cors = require('cors');
const env = require("dotenv").config();
const connectDB = require("./config/db.config");
const router = require("./routers/index.route");
const morgan = require("morgan")
const bodyparser = require("body-parser");
const errorHandler = require("./middlewares/errorhandler.middleware");
connectDB();///made connnection to server

//creating express app
const app = express();
app.use(bodyparser.json())
app.use(cors()); // Enable CORS with options
app.use(morgan("dev"));

//initialize ht erouters
app.use("/",router);


app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);//run server on http
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
