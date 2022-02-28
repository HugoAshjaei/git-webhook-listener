const express = require("express"),
    compression = require("compression"),
    bodyParser = require("body-parser"),
    helmet = require("helmet"),
    dotenv = require('dotenv'),
    cors = require('cors'),
    morgan = require('morgan');


// Initializing the server(app)
const app = express();

dotenv.config();

// Initializing the middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(express.json({
    limit: "300kb"
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(morgan('dev'));


// Routes
app.use("/", require("./routes"));

module.exports = app;