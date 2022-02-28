const sendResponse = require('../utils/sendResponse'),
    en = require('../helper/language/en.json'),
    crypto = require('crypto');

module.exports = async (req, res, next) => {
    try {
        if (req.params.provider == 'gitlab' && req.headers['x-gitlab-token'] != process.env.SECRET) {
            const error = new Error(en.unauthorized);
            error.status = 401;
            throw error;
        } else if (req.params.provider == 'github') {
            const hmac = crypto.createHmac('sha1', process.env.SECRET);
            hmac.update(JSON.stringify(req.body));
            const digest = 'sha1=' + hmac.digest('hex');
            if (req.headers['x-hub-signature'] != digest) {
                const error = new Error(en.unauthorized);
                error.status = 401;
                throw error;
            }
        } else if (req.params.provider != 'gitlab' && req.params.provider != 'github') {
            const error = new Error(en.unauthorized);
            error.status = 401;
            throw error;
        }
        if (req.body.repository.name !== req.params.repository) {
            const error = new Error(en.notFound);
            error.status = 404;
            throw error;
        }
        if (!req.body.ref) {
            const error = new Error(en.enterDataCorrectly);
            error.status = 400;
            throw error;
        }
        req.body.branch = req.body.ref.split('/')[req.body.ref.split('/').length - 1];
        next();
    } catch (err) {
        console.log(error);
        return sendResponse(res, error.status || 400, {
            error: {
                message: error.message || en.enterDataCorrectly
            }
        });
    }
};