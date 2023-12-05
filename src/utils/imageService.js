const s3 = require('../data/s3');

module.exports = {
    uploadImage: async (path, buffer, mimetype) => {
        const image = await s3.upload({
            Bucket: process.env.BB_BUCKET,
            Key: path,
            Body: buffer,
            ContentType: mimetype
        }).promise();

        return `https://${process.env.BB_BUCKET}.${process.env.BB_ENDPOINT}/${image.Key}`;
    },

    deleteImage: async (url) => {
        const path = 'images/' + url.split('/images/')[1];

        await s3.deleteObject({
            Bucket: process.env.BB_BUCKET,
            Key: path
        }).promise();
    }
}