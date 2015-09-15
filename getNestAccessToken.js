/*
 * This script will exchange your PIN for an access token, which will be written
 * to the file "settings.js".
 * 
 * Prior to running this script, you must create a file named "settings.js"
 * based on "settings.js.template".
 * Then you must fill in the client ID, client secret, and PIN in "settings.js".
 * See additional instructions within settings.js.
 *
 * Copyright 2015: Benjamin Kraus
 */

// Grab the client_id, client_secret, and PIN from the settings.
var settings;
try {
    settings = require('./settings.js');
    settings = settings.Nest;
}
catch (e) {
    console.error('Error: You must create a "settings.js" file prior to using this script.');
    console.error('       Rename "settings.template.js" to "settings.js", then');
    console.error('       fill in the client_id and client_secret.');
    return
}

// Make sure the client_id, client_secret, and PIN are all filled out.
if (settings.client_id == '' || settings.client_secret == '') {
    console.error('Error: You must fill in your client_id and client_secret prior to using this script.');
    console.error('       Follow the instructions in "settings.template.js"');
    return;
}

if (settings.pin == '') {
    console.error('Error: You must fill in your PIN prior to using this script.');
    console.error('       Follow the instructions in "settings.template.js"');
    return;
}

// Build the POST parameters.
var params = 'client_id=' + settings.client_id +
             '&code=' + settings.pin + 
             '&client_secret=' + settings.client_secret +
             '&grant_type=authorization_code';

// Configure the HTTPS connection to Nest.
var http = require('https');

var opts = {
    host: 'api.home.nest.com',
    path: '/oauth2/access_token',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': params.length
    }
};

// Create an HTTPS connection to Nest.
var req = http.request(opts, function(response) {

    // Successful connection should result in status code 200
    // Status code 400 indicates that you successfully connected, but that there
    // was something wrong with your request, such as an invalid PIN.
    if (response.statusCode != 200 && response.statusCode != 400) {
        console.error("An error occurred while contacting the Nest authentication server.")
        console.error("HTTP status code " + response.statusCode);
    }

    // Append any data received to 'res_data'.
    var res_data = '';
    response.on('data', function(chunk) {
        res_data += chunk;
    });

    // Once all the data is received, parse the response for the access token.
    response.on('end', function() {
        // Convert the data received into a JavaScript object.
        var data = JSON.parse(res_data);

        // If an error occurred there will be an 'error' field in the data.
        if (data.error) {
            console.error('An error occurred while aquiring an access token.');
            console.error('          error: ' + data.error);
            console.error('    description: ' + data.error_description);
            if (data.error == 'oauth2_error') {
                console.error('This error may have occurred if you tried to reuse a PIN.');
            }

        // Otherwise you should have an access token.
        } else if (data.access_token) {
            console.log("Access token acquired:")
            console.log(data.access_token);
            console.log("Writing access token to settings.js");
            writeSettings(data.access_token);
        }
    });
});

// Display an error message if the connection fails for some reason.
req.on('error', function(e) {
    console.error("Error: " + e.message);
});

// Send the POST request
req.write(params);
req.end();

// Write the access token to the "settings.js" file.
// This will append the access token to the end of the file, but feel free to
// move it to somewhere else in the file.
function writeSettings(access_token) {
    var fs = require('fs');
    var str = '\nmodule.exports.Nest.accessToken = "' + access_token + '";\n';
    fs.appendFile('settings.js',str);
}
