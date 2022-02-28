const { get } = require("lodash");

const express = require("express"),
    router = express.Router(),
    {
        checkAndDeploy,
    } = require("../../controllers/webhook");

router.post(
    "/:provider/:repository",
    checkAndDeploy,
);

module.exports = router;