const router = require("express").Router();
const File = require("../models/file")

router.get("/:uuid", async (req, res) => {

    try {

        const file = await File.findOne({
            uuid: req.params.uuid
        });
        if (!file) {
            res.status(500).json({
                iam: " link expire"
            });

        }
        return res.status(200).json({
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_LINK}/files/download/${file.uuid}`
        });

    } catch (error) {
        res.status(500).json({
            iam: error
        });

    }





});



module.exports = router;