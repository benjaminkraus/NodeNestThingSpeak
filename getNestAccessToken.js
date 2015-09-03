// This script will exchange your PIN for an access token, which will be written to the file "settings.js".
// 
// Prior to running this script, you must create a file named "settings.js" based on "settings.js.template".
// Then you must fill in the client_id, client_secret, and PIN in "settings.js"
// See additional information within "settings.js".

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

// Create an HTTPS connection to Nest.
var http = require('https');

var opts = {
      host: 'api.home.nest.com',
      port: '443',
      path: '/oauth2/access_token',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': params.length
      }
  };

var req = http.request(opts, function(response) {
    var res_data = '';
    response.on('data', function(chunk) {
        res_data += chunk;
   });
    response.on('end', function() {
        var data = JSON.parse(res_data);
        if (data.error) {
            console.error('An error occurred while aquiring an access token.');
            console.error('          error: ' + data.error);
            console.error('    description: ' + data.error_description);
            if (data.error == 'oauth2_error') {
                console.error('This error may have occurred if you tried to reuse a PIN.');
            }
        } else if (data.access_token) {
            console.log("Access token acquired:")
            console.log(data.access_token);
            console.log("Writing access token to settings.js");
            writeSettings(data.access_token);
        }
    });
});

req.on('error', function(e) {
  console.log("Error: " + e.message);
});

// Send the POST request
req.write(params);
req.end();

function writeSettings(access_token) {
    // Write the access token to the settings.js file.
    var fs = require('fs');
    var str = '\nmodule.exports.Nest.accessToken = "' + access_token + '";\n';
    fs.appendFile('settings.js',str);
}
