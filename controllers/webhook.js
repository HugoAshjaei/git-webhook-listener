const en = require('../helper/language/en.json'),
    sendResponse = require('../utils/sendResponse'),
    webhookService = require('../services/webhook');

exports.checkAndDeploy = async (req, res) => {
    try {
        const shell = await webhookService.check(req.params.provider, req.params.repository, req.body.branch);
        webhookService.deploy(shell, req.params.provider, req.params.repository, req.body.branch, req.body.repository.ssh_url).then(() => {
            sendResponse(res, 200, {
                message: en.success
            });
        }).catch(error => {
            const err = new Error(error.message || en.scriptProcessFailed);
            err.status = 404;
            throw err;
        });
    } catch (error) {
        console.log(error);
        return sendResponse(res, error.status || 400, {
            error: {
                message: error.message || en.enterDataCorrectly
            }
        });
    }
};