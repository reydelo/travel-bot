const qs = require("querystring");
const axios = require("axios");

const { SLACK_ACCESS_TOKEN, SLACK_API_URL } = require("./config");

const findUser = (slackUserId) =>
  axios.post(
    `${SLACK_API_URL}/users.info`,
    qs.stringify({ token: SLACK_ACCESS_TOKEN, user: slackUserId })
  );

const openDialog = (dialog) =>
  axios
    .post(
      `${SLACK_API_URL}/dialog.open`,
      qs.stringify({ ...dialog, token: SLACK_ACCESS_TOKEN })
    )
    .then((result) => {
      if (result.data.ok === false) {
        console.error(result.data);
        throw new Error(`Error dialog.open: ${result.data.error}`);
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });

const postEphemeralChat = (data) =>
  axios
    .post(
      `${SLACK_API_URL}/chat.postEphemeral`,
      qs.stringify({ ...data, token: SLACK_ACCESS_TOKEN })
    )
    .then((result) => {
      if (result.data.ok === false) {
        console.error(result.data);
        throw new Error(`Error chat.postEphemeral: ${result.data.error}`);
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });

module.exports = { findUser, openDialog, postEphemeralChat };
