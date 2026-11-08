const allowedFileTypes = [
    'images/jpeg',
    'image/png',
    'image/webp',
    'image.gif',
    'applicatopn/pdf',
    'application/msword',
    'application/zip',
    'application/ms-excel',
    'appication/ms-powerpoint',
    'video/mp4',
    'video/avi',
    'video/mov',
    'video/mpeg',
    'text/plain'
]

const validateFileType = (req, res, next) => {
    if(!req){
        return res.status(400).json({ error: "файл не надіслано" });
    }
    if(!allowedFileTypes.includes(req.file.mimetype)){
        return res.status(400).json({
            message: "Недозволений тип файлу",
            allowedTypes: allowedFileTypes
        });

    }
    next();
}

const validateFileSize = (req, res, next) => {
    if(!req.file){
        return res.status(400).json({ error: "файл не надіслано" })
    }
    const maxSize = 10 * 1024 * 1024;

    if(req.file.size > maxSize){
        return res.status(400).json({
            message: 'файл повинен бути менше 10 МБ',
            maxSize: maxSize
        })
    }
    next();
}

module.exports = { validateFileType, validateFileSize}