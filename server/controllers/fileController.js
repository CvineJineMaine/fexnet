const FileModel = require('../models/Files');
const { generateFileCode } = require('../utils/codeGenerator');

const uploadFile = async (req, res) => {
    try{
        if(!req.file){
            return res.status(400).json({ error: "Файл не був надісланий"});
        }
        console.log('test');
        const fileCode = generateFileCode();

        const newFile = new FileModel({
            filename: req.file.filename,
            path: req.file.path,
            code: fileCode
        })

        await newFile.save();
        res.status(200).json(
            {
                message: "Файл успішно завантажено",
                code: fileCode
            }
        )
    } catch(error){
        console.error("error uploading file", error);
        res.status(500).json({ error: "Error uploading file" });
    }
}
const downloadFile = async (req, res) => {
    try{
        const fileCode = req.params.code;

        const fileData = await FileModel.findOne({ code: fileCode });

        if(!fileData){
            return res.status(400).json({ error: "Файл не знайдено" });
        }
        res.download(fileData.path, fileData.filename)

    } catch(error){
        console.error("Error getting file", error);
        res.status(500).json({ error: "Error getting file " })
    }
}

module.exports = { uploadFile, downloadFile }