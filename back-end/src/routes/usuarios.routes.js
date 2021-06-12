const { Router } = require('express');
const router = Router();
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");


router.route("/test/all").get(controller.allAccess);

router.route("/test/user").get([authJwt.verificaToken], controller.userBoard);

module.exports = router;