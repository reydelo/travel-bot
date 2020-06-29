// Import express and request modules
const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config");
const slack = require("./slack");
const dialogElements = require("./dialog-elements.js");
const {
  submitTravelRequest,
  updateTrainInfo,
  getTrainInfoForUser,
} = require("./google-spreadsheet");

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const slackCommands = {
  requestTrain: "request_train",
  updateTrainInfo: "update_train_info",
};

app.listen(PORT, () => {
  console.log(`travel-bot slack app listening on port ${PORT}`);
});

app.post("/update-train-info", urlencodedParser, async (req, res) => {
  // immediately respond with a empty 200 response to let Slack know the command was received
  res.send("");
  const { trigger_id, user_id, channel_id } = req.body;

  const slackUserEmail = await slack
    .findUser(user_id)
    .then(({ data }) => data.user.profile.email);

  getTrainInfoForUser(slackUserEmail)
    .then((row = {}) => {
      const dialog = {
        trigger_id,
        dialog: JSON.stringify({
          title: "Update train defaults",
          callback_id: slackCommands.updateTrainInfo,
          submit_label: "Submit",
          elements: [
            { ...dialogElements.homeStation, value: row.homeStation },
            {
              ...dialogElements.destinationStation,
              value: row.destinationStation,
            },
            {
              ...dialogElements.homeDepartureTime,
              value: row.homeDepartureTime,
            },
            {
              ...dialogElements.destinationDepartureTime,
              value: row.destinationDepartureTime,
            },
            { ...dialogElements.bahnCardType, value: row.bahnCardType },
            { ...dialogElements.bahnCardNumber, value: row.bahnCardNumber },
          ],
        }),
      };

      slack.openDialog(dialog);
    })
    .catch((err) =>
      slack.postEphemeralChat({
        text: `Error while getting train info: ${err.message}`,
        channel: channel_id,
        user: user_id,
      })
    );
});

app.post("/train-request", urlencodedParser, (req, res) => {
  // immediately respond with a empty 200 response to let Slack know the command was received
  res.send("");
  const { trigger_id } = req.body;
  const {
    outwardDate,
    returnDate,
    travelReason,
    travelMessage,
  } = dialogElements;
  const elements = [travelReason, outwardDate, returnDate, travelMessage];

  const dialog = {
    trigger_id,
    dialog: JSON.stringify({
      title: "Submit a train request",
      callback_id: slackCommands.requestTrain,
      submit_label: "Submit",
      elements,
    }),
  };

  slack.openDialog(dialog);
});

app.post("/interactive", urlencodedParser, (req, res) => {
  // immediately respond with a empty 200 response to let Slack know the command was received
  res.send("");

  const payload = JSON.parse(req.body.payload);
  const { callback_id: callbackId } = payload;

  if (callbackId === slackCommands.requestTrain) {
    processTrainRequest(payload);
  }

  if (callbackId === slackCommands.updateTrainInfo) {
    processTrainInfo(payload);
  }
});

const processTrainRequest = async ({ channel, user, submission }) => {
  const slackUserEmail = await slack
    .findUser(user.id)
    .then(({ data }) => data.user.profile.email);

  submitTravelRequest({
    ...submission,
    email: slackUserEmail,
    travelType: "train",
  })
    .then(() =>
      slack.postEphemeralChat({
        text: "Train Request successfully submitted",
        channel: channel.id,
        user: user.id,
      })
    )
    .catch((error) =>
      slack.postEphemeralChat({
        text: `Error processing train request: ${error.message}`,
        channel: channel.id,
        user: user.id,
      })
    );
};

const processTrainInfo = async ({ channel, user, submission }) => {
  const slackUserEmail = await slack
    .findUser(user.id)
    .then(({ data }) => data.user.profile.email);

  updateTrainInfo({ ...submission, email: slackUserEmail })
    .then(() =>
      slack.postEphemeralChat({
        text: "Train defaults successfully updated",
        channel: channel.id,
        user: user.id,
      })
    )
    .catch((err) =>
      slack.postEphemeralChat({
        text: `Error processing train info ${err.message}`,
        channel: channel.id,
        user: user.id,
      })
    );
};
