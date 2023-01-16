const mongoose = require("mongoose");
const url = process.env.URL;
require('dotenv').config();


const connection = mongoose.connect(url);

module.exports = {
    connection
}