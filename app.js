const express = require("express");
const app = express();
const stylus = require("stylus");

const api = require("./api/controller/index");
const server = require("./server/routes/index");

app.use(require("express-fileupload")({}));
app.use(express.urlencoded({extended: true}));
app.use(stylus.middleware({
    src: __dirname + "/public",
    compile: (str, path) => {
        return stylus(str).set("filename", path);
    }
}));
app.set("views", "./server/views");
app.set("view engine", "hbs");
app.use(express.static("./public"));
app.use("/api", api);
app.use("/", server);

app.listen(3000);