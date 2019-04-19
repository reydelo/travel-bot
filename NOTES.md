Tasks:

[] - determine a name for the bot
[] - create a bot user in slack
[] - give bot access to the Events API
[] - add the bot to our workspace (?)

Resources:

[Enabling interactions with bots](https://api.slack.com/bot-users#)

MVP:

- allow slack users to submit travel requests
- save information about the user to reduce data entry
 - Bahn Card
 - Travel Days and Travel Times defaults
 - To/From Location
 - Additional notes for HR (for example, hotel preferences)
 - name of supervisor
 - reason for traveling
 - NOTE: The bot should require the user to confirm that travel was approved by ${supervisorName}
- fill out and submit the [google form](https://docs.google.com/forms/d/e/1FAIpQLSegTwtdhl0OGs6Wzxa1xqTc2K3DjhVjO-iPFKx6LGyzGJ-kwQ/viewform) on behalf of the user
 - provide confirmation that the form was submitted


travel bot commands

/request
/view - display current travel arrangements
/list-history - show travel history (for accounting) 