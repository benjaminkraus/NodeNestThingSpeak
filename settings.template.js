/* This file is used to store all your personal settings.
 *
 * It is a mix of user-supplied information with information generated
 * automatically by either getNestAccessToken.js or getNextInformation.js
 *
 * See instructions below for how to complete the settings.
 */

// Create an object to store Nest client related settings.
module.exports.Nest = {};

/*
 * Fill in the client_id and client_secret using information from this page:
 * https://developer.nest.com/clients
 * 
 * Your client ID and client secret are only necessary to acquire your access token,
 * but there is no harm in leaving these settings in place in case you need them later.
 */
module.exports.Nest.client_id = "";
module.exports.Nest.client_secret = "";

/*
 * Follow the instructions on this page to get the correct PIN to use.
 * https://developer.nest.com/documentation/cloud/rest-quick-guide/
 * 
 * Your PIN can only be used once to acquire an access token.
 */
module.exports.Nest.pin = "";

/*
 * Once you have filled out 'client_id', 'client_secret', and 'pin', use
 * getNestAccessToken.js. That script will add a new entry to the end of this
 * file that includes your Nest access token in the following form:

 module.exports.Nest.accessToken = "c.AeW5XbiNfeRKRdYVB...";

 * Your access token is valid for a long time (typically several years), however
 * you may need to acquire a new access token if Nest updates their API or if
 * the user removes the "Works with Nest" connection to your client.
 */

/* 
 * Once you have a Nest access token, you can test your access token by running
 * getNestInformation.js. This script will add a block similar to the following
 * to the end of this file:

module.exports.Nest.Structures = {
    "Structure Name": "ChannelID"
};

module.exports.Nest.Thermostats = {
    "Thermostat 1 Name": "ChannelID",
    "Thermostat 2 Name": "ChannelID"
};

 * You will need to replace "ChannelID" with the ThingSpeak channel ID that you
 * want associated with each structure or thermostat. You can remove any
 * structures or thermostats that you want to ignore.
 *
 * Each structure channel should have this structure:
 *     Field 1: Home or Away
 *
 * Each thermostat channel should have this structure:
 *     Field 1: Temperature (F)
 *     Field 2: Humidity (%)
 *     Field 3: Target Temperature (F)
 *     Field 4: Max Temperature (F)
 *     Field 5: Min Temperature (F)
 *     Field 6: Has Leaf
 *     Field 7: HVAC State
 *     Field 8: HVAC Mode
 */

/*
 * Next you will need to set up the "Write API Key" for each of your channels
 * using a block of code like this:
 */

modules.exports.ThingSpeak = {
    "ChannelID": "WR5LS9R0EPYTROFY",
    "ChannelID": "GX9PMFRVFC5WSLQY",
    "ChannelID": "4PWBCBNLXCUSG6PD"
};

/*
 * Once you have a Nest access token, and have set up a mapping from your Nest
 * structures and thermostats to ThingSpeak channels, as well as your ThingSpeak
 * write API keys, you should be all set to run nodeNestThingSpeak.js.
 *
 * Use this command to run nodeNestThingSpeak.js:

$ node nodeNestThingSpeak.js &

*/