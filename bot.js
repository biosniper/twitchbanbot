// This bot has been made from lots of example code to serve a single purpose of banning multiple names from a list
// This bot conforms to Twitch Bot rate limits on the 13/09/2021
// See https://dev.twitch.tv/docs/irc/guide#rate-limits
//
// ------Command and message rate limits 
// ------If command and message rate limits are exceeded, an application cannot send chat messages or commands for 30 minutes.
// ------100 per 30 seconds
// ------Users sending commands or messages to channels in which they are the broadcaster or have Moderator status

// Your .env file should specify an account you are using as a moderator in your channel
// I would recommend having a second account specifically for this purpose
// If you chat in your channel at the same time as the bot is running, you MAY hit the message limit rate
// This could result in your account being banned!

const tmi = require('tmi.js');
const dotenv = require('dotenv');
// Define configuration options

dotenv.config({path: '.env'});

const opts = {
  identity: {
    username: process.env.BOT_USERNAME, // Username for bot account
    password: process.env.OAUTH_TOKEN // Should include the full token including the oauth:
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();
  

  // If the command is known, let's execute it
  if (commandName === '!banningrun') {
    client.say(target, 'Starting banning run in 5 seconds...');
    console.log(`* Executed ${commandName} command`);
    console.log('Ban run starting in 5 seconds...');
    console.log('You can stop this ban run at any time by Killing the nodejs process running this script');
    sleep(5000);
    console.log('Ban run begins...');
    client.say(target, 'Starting now... Check nodejs console for output!');

    var lineReader = require('line-reader');
    lineReader.eachLine('banlist.txt', function(line) {
    
    if (line.includes('BANLISTEND')) { 
    client.say(target, 'We have finished the ban list processing now');
    console.log('List processing finished, you can kill this application');
    return false; 
    }
    
    else{
    client.say(target, '/ban ' + line);
    console.log('Banned user ' + line);
    sleep(500); // Twitch Documentation indicates max 100 messages per 30 seconds for mods or broadcasters. 0.5sec between bans keeps us withi>
    }
});

  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}


// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

