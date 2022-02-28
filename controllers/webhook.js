const en = require('../helper/language/en.json'),
    sendResponse = require('../utils/sendResponse'),
    webhookService = require('../services/webhook');

exports.checkAndDeploy = async (req, res) => {
    try {
        console.log("--------------------------- body")
        console.log(req.body);
        console.log("--------------------------- query")
        console.log(req.query);
        console.log("--------------------------- headers")
        console.log(req.headers);
        // const shell = await webhookService.check(req.params.provider, req.params.repository);
        // await webhookService.deploy(shell);
        sendResponse(res, 200, {
            message: en.success
        });
    } catch (error) {
        return sendResponse(res, error.status || 400, {
            error: {
                message: error.message || en.enterDataCorrectly
            }
        });
    }
};