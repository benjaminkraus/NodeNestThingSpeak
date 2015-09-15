# NodeNestThingSpeak

Node.js code for logging data from a Nest thermostat to ThingSpeak.

__Note: This script is NOT finished and will not work__

## Requirements

npm install firebase

npm install thingspeakclient

## Installation

1. Clone git repository.
2. Install 'firebase' and 'thingspeakclient' using 'npm'.
3. Follow configuration steps.

## Configuration

1. Copy 'settings.template.js' to 'settings.js'
2. Read 'settings.js' for detailed instructions.
3. Fill in Nest client ID, client secret, and PIN (using instructions in settings.js).
4. Run 'node getNestAccessToken.js'
5. Run 'node getNestInformation.js'
6. Set up ThingSpeak channels: one for each structure, and one for each thermostat.
7. Add ThingSpeak channel IDs and write API keys to 'settings.js' (using instructions in settings.js).
8. Run 'node nodeNestThingSpeak.js &'