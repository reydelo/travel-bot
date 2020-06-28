const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    GOOGLE_SPREADSHEET_KEY: process.env.GOOGLE_SPREADSHEET_KEY,
    PORT: process.env.PORT,
    SLACK_ACCESS_TOKEN: process.env.SLACK_ACCESS_TOKEN,
    SLACK_API_URL: process.env.SLACK_API_URL,
    SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
    SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
};
