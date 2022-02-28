const express = require("express"),
    router = express.Router();

router.use(
    "/webhook",
    require("./webhook")
);

module.exports = router;
