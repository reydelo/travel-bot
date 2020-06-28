const qs = require("querystring");
const axios = require("axios");

const { SLACK_ACCESS_TOKEN, SLACK_API_URL } = require("./config");

const findUser = (slackUserId) => {
  const body = { token: SLACK_ACCESS_TOKEN, user: slackUserId };
  const promise = axios.post(`${SLACK_API_URL}/users.info`, qs.stringify(body));
  return promise;
};

module.exports = { findUser };
