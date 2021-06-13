const { Router } = require('express');
const router = Router();

router.get("/", (req, res) => {
  return res.json({
    msg: "Bienvenido a la api react-gallery v0.1",
  });
});

module.exports = router;