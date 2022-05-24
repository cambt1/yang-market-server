var router = require("express").Router();
var service = require("./banner.service");

router.get("/", service.index);

router.post("/create", service.create);
module.exports = router;
