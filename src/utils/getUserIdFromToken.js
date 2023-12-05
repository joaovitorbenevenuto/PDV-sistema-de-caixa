const { getUserAuth } = require('../data/token');

module.exports = (req) => {
    const bearer = req.headers.authorization;
    const token = bearer.split(' ')[1];
    const { id } = getUserAuth(token);

    return id;
}
