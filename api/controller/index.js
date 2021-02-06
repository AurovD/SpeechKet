const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
const parser = require("body-parser").json();
const { URLSearchParams } = require('url');
const fs = require('fs');
const params = new URLSearchParams();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})

const upload = multer({storage});

const token = 'AQVNzsNXvwiWPAeoSKUTvCpSj8-1sjDbZJZY8jIP';

router.post("/text", parser, async (req, res) => {
        params.append('text', req.body.text);
        params.append('voice', 'zahar');
        params.append('emotion', 'good');
        params.append('lang', 'ru-RU');
        params.append('speed', '1.0');
        params.append('format', 'oggopus');
        try {
            let respond = await fetch('https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize', {
                method: 'POST',
                headers: {
                    'Authorization': 'Api-Key ' + token,
                },
                body: params,
            })
                const file = fs.createWriteStream('./public/file/voice.ogg');
                respond.body.pipe(file);
                if(respond.status) {
                    res.send({
                        "msg": respond.status
                    });
                }
        } catch (err) {
            throw new Error(err);
        }
    }
)
router.post("/audio", upload.single("file"), async (req, res) => {
        console.log(req.files.file.data);
        params.append('topic', 'general');
        params.append('profanityFilter', false);
        params.append('lang', 'ru-RU');
        params.append('sampleRateHertz', '16000');
        params.append('format', 'oggopus');
        try {
            let respond = await fetch('https://stt.api.cloud.yandex.net/speech/v1/stt:recognize?topic=general&lang=ru-RU&format=oggopus', {
                method: 'POST',
                headers: {
                    'Authorization': 'Api-Key ' + token,
                },
                body: req.files.file.data,
            })
            let msg = await respond.json();
            console.log(msg)
            if(respond.status) {
                res.send({
                    "text": msg.result,
                    "msg": respond.status
                });
            }

        } catch (err) {
            throw new Error(err);
        }
    }
)

module.exports = router;