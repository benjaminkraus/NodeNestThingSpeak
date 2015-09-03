// Create an object to store Nest client related settings.
module.exports.Nest = {};

// Fill in the client_id and client_secret using information from this page:
// https://developer.nest.com/clients
//
// Your client ID and client secret are only necessary to acquire your access token.
// Once you are done exchanging your PIN for an access token (using getNestAccessToken.js),
// you can remove or blank out the settings below.
module.exports.Nest.client_id = "";
module.exports.Nest.client_secret = "";

// Follow the instructions on this page to get the correct PIN to use.
// https://developer.nest.com/documentation/cloud/rest-quick-guide/
// 
// Your PIN can only be used once.
// Once you are done exchanging your PIN for an access token (using getNestAccessToken.js),
// you can remove or blank out the setting below.
module.exports.Nest.pin = "";
