const router = require("express").Router();
const {
    v4: uuid
} = require("uuid");
const multer = require("multer");
const path = require("path");
const File = require("../models/file")
let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filenamej: (req, file, cb) => {
        const uniquename = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null, uniquename);



        
    }
});
let upload = multer({
    storage,
    limits: {
        fileSize: 1000000 * 100
    },
}).single('myfile');
router.post("/", (req, res) => {

   
    upload(req, res,async (err) => {
       if (!req.file) {
           res.json({
               error: "you have selected empyt file"
           });
       }
        if (err) {
            res.status(500).json({
                error: "upload error"
            });
        }



        const file = new File({
            filename: req.file.filename,
            uuid: uuid(),
            path : req.file.path,
            size: req.file.size,

        });
        const response = await file.save(); 
        return res.json({
            file: `${process.env.APP_BASE_LINK}/files/${response.uuid}`
        });

    });
});



module.exports = router;