const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
});

// post middlewares

fileSchema.post("save" , async function(doc){
    try{
        console.log("doc", doc)

        // transporter 

        let transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // send mail 

            let info = await transport.sendMail({
                from: process.env.MAIL_USER,
                to: doc.email,
                subject: "File Uploaded Successfully on cloudinary",
                text: `Your file ${doc.name} has been uploaded successfully. You can access it here: ${doc.fileUrl}`,
            });

            console.log(info)
    }
    catch(error){
        console.error(error)
    }
})
const File = mongoose.model("File" , fileSchema);
module.exports = File;