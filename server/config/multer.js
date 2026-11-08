const multer = require('multer');
const path = require('path');
const fs = require('fs');

if(!fs.existsSync('./uploads')){
    fs.mkdirSync('./uploads');
    console.log('uploads folder created');
}

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});
module.exports = upload;