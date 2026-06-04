const mongoose = require("mongoose");

require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("DB connected successfully"))
    .catch((err) =>{
        console.log("db connection issue ");
        console.error(err);
        process.exit(1);
    })
}