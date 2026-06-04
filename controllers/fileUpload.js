const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try {

        if (!req.files || !req.files.file) {
            return res.status(400).json({
                success: false,
                message: "No file provided for local upload"
            })
        }

        //fetch filefrom request
        const file = req.files.file;
        console.log("FILE AAGYI JEE -> ", file);


        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        //add path to the move fucntion
        file.mv(path, (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success: true,
            message: 'Local File Uploaded Successfully',
        });

    }
    catch (error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isFileTypeSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath, options );
}

// image Uploader Handler 
exports.imageUpload = async (req, res) => {
    try {

        // data fetch
        const { name, tags, email } = req.body || {};
        if (!name || !tags || !email) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, tags, and email"
            })
        }
        console.log(name, tags, email);

        const file = req.files?.imageFile;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No image file provided"
            })
        }
        console.log(file);

        // validation
        const supportedTypes = ["png", "jpg", "jpeg"];
        const fileType = file.name.split('.').pop().toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // file format supported
        console.log("uploading to cloud")
        console.log("File tempFilePath:", file.tempFilePath);
        const response = await uploadFileToCloudinary(file, "anshu");
        console.log("Cloudinary response:", response);
        
        if (!response) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload to cloudinary"
            })
        }

        // DB me save krna 

        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.secure_url
        })

       res.json({
        success:true,
        fileUrl: response.secure_url,
        message:"File uploaded successfully"
       })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

///Video Uploader Handler 
exports.videoUpload = async (req, res) => {
    try {
        // fetch data
        const { name, tags, email } = req.body || {};
        if (!name || !tags || !email) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, tags, and email"
            })
        }
        console.log(name, tags, email);

        const file = req.files?.videoFile;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No video file provided"
            })
        }

        // Validation
        const supportedTypes = ["mp4", "mkv", "avi"];
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log('filetype : ', fileType)

        // todo add a uppper limit upto 5mb

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // file format suppported

        console.log("uploading to cloud")
        console.log("File tempFilePath:", file.tempFilePath);
        const response = await uploadFileToCloudinary(file, "anshu");

        console.log("Cloudinary response:", response);
        
        if (!response) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload to cloudinary"
            })
        }
        // Save to DB
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.secure_url
        })
        res.json({
            success: true,
            fileUrl: response.secure_url,
            message: "Video uploaded successfully"
        })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

// Image Reducer Handler
exports.imageReducer = async (req, res) => {
    try {

        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // Fetch file 
        const imageFile = req.files.imageFile;
        console.log(imageFile);

        const supportedTypes = ["png", "jpg", "jpeg"];
        const fileType = imageFile.name.split('.')[1].toLowerCase();

        // Check file type is supported or not 
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // Upload to Cloudinary
        // HW - Decrease size by height and width 
        const response = await uploadFileToCloudinary(imageFile, "FileApp", 50);
        console.log(response)


        // Upload to DB 
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.secure_url
        })


        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            fileUrl : response.secure_url
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}