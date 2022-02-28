const express = require("express"),
    router = express.Router(),
    detials = require("../middleware/config");

router.all(
    "/",
    detials
);

module.exports = router;
