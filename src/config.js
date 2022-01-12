import dotenv from 'dotenv';
dotenv.config({path: __dirname + '/.env'});

exports.cloud_name = process.env.CLOUD_NAME;
exports.api_key = process.env.API_KEY;
exports.api_secret = process.env.API_SECRET;