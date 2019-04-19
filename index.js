// Import express and request modules
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const qs = require('querystring');
const axios = require('axios');

const { PORT, SLACK_ACCESS_TOKEN, SLACK_API_URL } = require('./constanants.js');
const dialogElements = require('./dialog-elements.js');
const users  = require('./users.js');
const { submitTravelRequest, updateTrainInfo, getTrainInfoForUser } = require('./google-spreadsheet');

const app = express();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const slackCommands = {
    requestTrain: 'request_train',
    updateTrainInfo: 'update_train_info',
};

app.listen(PORT, () => {
    console.log(`travel-bot slack app listening on port ${PORT}`);
});

const respondWithEphemeral = (data) => {

    axios
      .post(`${SLACK_API_URL}/chat.postEphemeral`, qs.stringify(data))
      .catch(err => {
        console.log({ err });
      });
};

const postWithSlackDialog = (dialog) => {
    dialog.token = SLACK_ACCESS_TOKEN;

    axios.post(`${SLACK_API_URL}/dialog.open`, qs.stringify(dialog))
        .then((result) => {
            const { data } = result;

            if (!data.ok) console.log(data);
        }).catch((err) => {
            console.log({err})
        });
};

app.post('/update-train-info', urlencodedParser, async (req, res) => {
    const { trigger_id, user_id, channel_id } = req.body;
    const {
      home_station,
      destination_station,
      home_departure_time,
      destination_departure_time,
      bahncard_type,
      bahncard_number
    } = dialogElements;

    res.send('Loading your data from Google Drive....');
    
    const slackUserEmail = await users
    .findUser(user_id)
    .then(result => result.data.user.profile.email);

    getTrainInfoForUser(slackUserEmail).then((row = {}) => {
        const dialog = {
            trigger_id,
            dialog: JSON.stringify({
                title: 'Update train defaults',
                callback_id: slackCommands.updateTrainInfo,
                submit_label: 'Submit',
                elements: [
                    { ...home_station, value: row.homestation},
                    { ...destination_station, value: row.destinationstation },
                    { ...home_departure_time, value: row.homedeparturetime },
                    { ...destination_departure_time, value: row.destinationdeparturetime },
                    { ...bahncard_type, value: row.bahncardtype },
                    { ...bahncard_number, value: row.bahncardnumber },
                ]
            })
        };
    
        postWithSlackDialog(dialog);
    }).catch(err => {
        respondWithEphemeral({
            token: SLACK_ACCESS_TOKEN,
            text: "Error while getting train info",
            channel: channel_id,
            as_user: false,
            user: user_id
        });
    });

});

app.post('/train-request', urlencodedParser, (req, res) => {
    const { trigger_id } = req.body;
    const { outward_date, return_date, travel_reason, travel_message } = dialogElements;

    res.send("Loading your data from Google Drive....");

    const dialog = {
      trigger_id,
      dialog: JSON.stringify({
        title: "Submit a train request",
        callback_id: slackCommands.requestTrain,
        submit_label: "Submit",
        elements: [
          travel_reason,
          outward_date,
          return_date,
          travel_message
        ]
      })
    };

    postWithSlackDialog(dialog);
});

app.post('/interactive', urlencodedParser, (req, res) => {
    // immediately respond with a empty 200 response to let
    // Slack know the command was received
    res.send('');

    const payload = JSON.parse(req.body.payload);
    const { callback_id: callbackId, channel } = payload;

    if (callbackId === slackCommands.requestTrain) {
        processTrainRequest(payload);
    }

    if (callbackId === slackCommands.updateTrainInfo) {
        processTrainInfo(payload);
    }
});

const processTrainRequest = async (data) => {
    const { channel, user, submission } = data;

    const slackUserEmail = await users
    .findUser(user.id)
    .then(result => result.data.user.profile.email);

    submitTravelRequest({ ...submission, email: slackUserEmail, travel_type: 'train'}).then(() => {
        respondWithEphemeral({
            token: SLACK_ACCESS_TOKEN,
            text: "Train Request successfully submitted",
            channel: channel.id,
            as_user: false,
            user: user.id
        });
    }).catch(err => {
        respondWithEphemeral({
            token: SLACK_ACCESS_TOKEN,
            text: "Error processing train request",
            channel: channel.id,
            as_user: false,
            user: user.id
        });
    });
};

const processTrainInfo = async (data) => {
    const { channel, user, submission } = data;

    const slackUserEmail = await users
    .findUser(user.id)
    .then(result => result.data.user.profile.email);

    updateTrainInfo({ ...submission, email: slackUserEmail}).then(() => {
        respondWithEphemeral({
            token: SLACK_ACCESS_TOKEN,
            text: "Train defaults successfully updated",
            channel: channel.id,
            as_user: false,
            user: user.id
        });
    }).catch(err => {
        respondWithEphemeral({
            token: SLACK_ACCESS_TOKEN,
            text: "Error processing train info",
            channel: channel.id,
            as_user: false,
            user: user.id
        });
    });

};