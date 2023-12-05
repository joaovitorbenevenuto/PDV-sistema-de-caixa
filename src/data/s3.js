const AWS = require('aws-sdk');
const endpoint = new AWS.Endpoint(process.env.BB_ENDPOINT);

const s3 = new AWS.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.BB_KEY_ID,
        secretAccessKey: process.env.BB_APP_KEY
    }
});

module.exports = s3;