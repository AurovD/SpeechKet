const exp = require("express");
let router = exp.Router();
router.get("/", (req, res) => {
    res.render("index");
});
module.exports = router;