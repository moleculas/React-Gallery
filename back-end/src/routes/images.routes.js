const { Router } = require('express');
const router = Router();
const controller = require("../controllers/images.controller");
const { verifyFileExists } = require("../middlewares");

router.post("/upload", [verifyFileExists.verificaArchivo], controller.upload);
router.get("/", controller.getImagenes);
router.get("/:id", controller.getImage);
router.delete("/:id", controller.delete);

module.exports = router;