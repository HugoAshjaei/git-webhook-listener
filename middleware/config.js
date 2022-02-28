const sendResponse = require('../utils/sendResponse');

module.exports = async (req, res) => {
    try {
        res.json({
            author: "Hossein MohammadiPour << https://hossein.link >>",
            headers: req.headers,
            ip: req.ip,
            your_ip: req.headers['cf-connecting-ip']
        })
    } catch (err) {
        return sendResponse(res, 500, {
            error: {
                message: err.message
            }
        });
    }
};