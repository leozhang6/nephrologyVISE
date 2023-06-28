Research Aid for Dr Devika Nair
To begin, add phone numbers of patients to phoneNumbers.csv

Start fitbit authorization server and automated survey process by running node index.js

Ask patients through sms to authorize their fitbit accounts as well as sign up their
phone number by running node sendAuthorizationLinks.js

The entire process should now be up and running!
Every 5 hours, the server will refresh all user fitbit authorization tokens to keep data access.
Every 10 minutes, the server will check the step-data for each user, and send an sms containing
survey link to those that have not logged any steps in the past hour.
