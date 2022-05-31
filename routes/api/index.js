var router = require("express").Router();
var service = require("./api.service");

router.get("/", service.index);
module.exports = router;
