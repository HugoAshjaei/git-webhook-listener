const express = require("express"),
    router = express.Router(),
    {
        checkAndDeploy,
    } = require("../../controllers/webhook"),
    auth = require("../../middleware/auth");

router.post(
    "/:provider/:repository",
    auth,
    checkAndDeploy,
);

module.exports = router;