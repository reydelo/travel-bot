# Travel Bot

A travel assistant integrated into Slack for HR teams and employees to easily book trains and accommodations via Google Sheets

---
## Requirements

For development, you will need Node.js, Brew, and Yarn, installed in your environement.  You will also need a slack workspace for testing.

---

## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ yarn install

## Configure app

Open `a/nice/path/to/a.file` then edit it with your settings. You will need:

- A setting;
- Another setting;
- One more setting;

## Running the project

    $ yarn start

## Test locally in slack

In order to test this locally in slack, it is recommended to use a service like ngrok.  It will provide you with a url that can be used for your request url in slack configuration

    $ brew cask install ngrok
    $ ngrok http PORT

---

## Slack Setup

To see this app in action, join the testing workspace: [reydelo-playground](https://join.slack.com/t/reydelo-playground/shared_invite/zt-fqy3eykw-on73wOD_fgv64hlGAciDjw)

To run this app in your own workspace, follow these steps:

1. [Create a Slack App](https://api.slack.com/apps)
1. Add Client ID and Client Sectret credentials to contants.js
1. Turn on the feature "Interactivity".  Use the url output from ngrok as the base url of the request url
1. Turn on feature "Slash Commands" by adding a new command.
    - Add commands for `/train-request` and `/update-train-info`
    - The request url for each command should be `${baseUrl}/${command-name}`, i.e. https://1234567abc.ngrok.io/train-request
1. "Install App to Your Team" in order to test and generate the token to ineract with the Slack API
    - Add the "Bot User OAUth Access Token to constants.js
    - Add the scopes "commands, users:read, users:read.email, chat:write"
1. If everything is set up correctly, you should be able to run `/train-request` and `/update-train-info` from your slack workspace

---

## Google Sheets API Setup

[Example Spreadsheet](https://docs.google.com/spreadsheets/d/1huFK5vLC6luhdxMXq5lSmAIdv9oyHEAM0NE3SuHkc74/)

1. Follow the [authentication documentation](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication) for `google-spreadsheet`
    - Create a service account
1. Add the google-generated-credentials to the app
1. Create a spreadsheet with (list) columns.
    - Add the spreadsheet ID to constants.js
    - Share the spreadsheet with the service account
