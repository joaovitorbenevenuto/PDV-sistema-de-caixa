const multer = require('multer');

module.exports = {
    multer: multer(),

    multerError: (err, req, res, next) => {
        if (err instanceof multer.MulterError)
            return res.status(400).json({ mensagem: 'Erro no upload de arquivo.' });

        next();
    }
}