const jwt = require('jsonwebtoken');

module.exports = {
    createUserToken: (user) => {
        return jwt.sign(user, process.env.JWT_PASS, { expiresIn: process.env.JWT_EXPIRES });
    },

    getUserAuth: (token) => {
        try {
            return jwt.verify(token, process.env.JWT_PASS);
        } catch (error) {
            return;
        }
    }
}