const express = require('express');
const router = express.Router();

const { localFileUpload, imageUpload, videoUpload ,imageReducer} = require('../controllers/fileUpload');

// api router
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/localfileupload", localFileUpload);
router.post("/imageReducer", imageReducer);

module.exports = router; 