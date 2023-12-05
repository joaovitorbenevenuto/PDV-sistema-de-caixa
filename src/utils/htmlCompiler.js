const fs = require('fs/promises');
const handlebars = require('handlebars');

module.exports = async (file, context) => {
    const html = await fs.readFile(file);
    const compiler = handlebars.compile(html.toString());
    const htmlString = compiler(context);

    return htmlString;
};
