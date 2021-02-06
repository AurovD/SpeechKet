const express = require("express");
const router = express.Router();
const ctr = require("../controller/index");
const parser = require("body-parser").json();
const multer = require("multer");

let storage = multer.diskStorage({
    destination: './public/users',
    filename: function (req, file, cb) {
        console.log("kjkhlh")
        switch (file.mimetype) {
            case 'image/jpeg':
                ext = '.jpeg';
                break;
            case 'image/png':
                ext = '.png';
                break;
        }
        cb(null, file.originalname + ext);
    }
});
let upload = multer({storage: storage});

router.post("/text", parser, ctr.text);
router.post("/audio", upload.single('file'), ctr.audio);
module.exports = router;