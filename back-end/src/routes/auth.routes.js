const { Router } = require('express');
const router = Router();
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");


router.post(
    "/auth/signup",
    [
      verifySignUp.checkDuplicadoNombreOMail    
    ],
    controller.signup
  );

router.post("/auth/signin", controller.signin);

module.exports = router;

