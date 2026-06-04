// app creation 
const express = require('express');
const app = express()

// port find krna hai 
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// db connection
const db = require('./config/db');
db.connect();

// cloud connection
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

// middleware add krna hai
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const fileupload = require('express-fileupload');
const path = require('path');
const os = require('os');
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(os.tmpdir(), 'fileupload')
}))



// api route mount krna hai 
const upload = require('./routes/fileUpload');
app.use('/api/v1/upload', upload);

// server activate krna hai 

app.listen(PORT, () =>{
    console.log(`server is running at port ${PORT}`);
});

