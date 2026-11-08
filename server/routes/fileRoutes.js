const express = require('express');
const router = express.Router();
const upload = require('../config/multer.js')

const { uploadFile, downloadFile } = require('../controllers/fileController')
const { validateFileType, validateFileSize } = require('../middlewares/validation');

router.post('/upload', upload.single('file'), uploadFile);

router.get('/download/:code', downloadFile);

module.exports = router;
