const {clearHash} = require('../services/cache');

module.exports = async (req, res, next) => {

    // Let router handler run everything first
    await next();

    // then clear the hash.
    clearHash(req.user.id);
}