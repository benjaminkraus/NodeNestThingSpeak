/*
 * This script will use your Nest access token to get information about the
 * structures and thermostats that are associated with your Nest account.
 * 
 * Prior to running this script, you must follow the instructions in
 * "settings.js" and use getNestAccessToken.js to get an access token.
 *
 * Copyright 2015: Benjamin Kraus
 */

// Grab the access token from the settings.
var settings;
try {
    settings = require('./settings.js');
}
catch (e) {
    console.error('Error: You must create a "settings.js" file and run "getNestAccessToken.js" prior to using this script.');
    console.error('       See "settings.template.js" and "getNestAccessToken.js"');
    return
}

// Make sure the access token is available.
if (!settings.Nest || !settings.Nest.accessToken || settings.Nest.accessToken == '') {
    console.error('Error: You must acquire an access token prior to using this script.');
    console.error('       Follow the instructions in "getNestAccessToken.js"');
    return;
}

// Authentication handler for the Firebase connection to Nest
function authHandler(error, authData) {
    if (error) {
        console.error("Login Failed!");
        console.error(error);
        console.error("Login Failed!", error);
    } else {
        console.log("Authenticated successfully.");
    }
}

// When data is received, write the settings to the "settings.js" script.
// This will append the settings to the end of the file, but feel free to
// move it to somewhere else in the file.
function writeSettings(snapshot) {
    var fs = require('fs');
    
    // Retrieve the data from the snapshot received from Nest 
    var data = snapshot.val();

    // Get the list of structure IDs
    var structureIDs = Object.keys(data.structures);

    // Write each structure name and ID to the "settings.js" file.
    if (structureIDs.length > 0) {
        console.log("Structures:");
        var str = "\nmodule.exports.Nest.Structures = {\n";
        var s = 0;

        structureIDs.forEach(function(sID) {
            console.log("    " + data.structures[sID].name + ": " + sID);

            s++;
            str += '    "' + data.structures[sID].name + '": "ChannelID"';
            if (s < structureIDs.length) str += ',';
            str += ' // ' + sID + '\n';
        });
        str += '};\n';

        fs.appendFileSync('settings.js',str);
    }

    // Get the list of thermostat IDs
    var thermostatIDs = Object.keys(data.devices.thermostats);

    // Write each thermostat name and ID to the "settings.js" file.
    if (thermostatIDs.length > 0) {
        console.log("Thermostats:");
        var str = "\nmodule.exports.Nest.Thermostats = {\n";
        var t = 0;

        thermostatIDs.forEach(function(tID) {
            console.log("    " + data.devices.thermostats[tID].name + ": " + tID);
            
            t++;
            str += '    "' + data.devices.thermostats[tID].name + '": "ChannelID"';
            if (t < thermostatIDs.length) str += ',';
            str += ' // ' + tID + '\n';

        });
        str += '};\n';

        fs.appendFileSync('settings.js',str);
    }

    // We are done getting information, so we can exit from Node
    process.exit();
}

// Create the connection to Nest
var Firebase = require('firebase');
var ref = new Firebase('wss://developer-api.nest.com');

// Authenticate using your Nest access token
ref.authWithCustomToken(settings.Nest.accessToken, authHandler);

// Send a request for data from Nest once.
ref.once('value', writeSettings);
