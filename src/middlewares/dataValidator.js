module.exports = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);

        next();
    } catch (error) {
        if (error.details[0].type === 'object.unknown')
            return res.status(400).json({ mensagem: `O campo '${error.details[0].context.key}' não é válido.` });

        return res.status(400).json({ mensagem: error.message });
    }
}