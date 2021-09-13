# twitchbanbot
Very early version of a banbot to simply run the ban commands in chat to ban bots provided in the original project https://github.com/therealnagia/twitchbanfromlist  
This bot grabs the text file from the same directory as the bot, and iterates the ban commands in your own chat line by line.  
Built from the example twitch bot API code at; https://dev.twitch.tv/docs/irc  

## Requirements
nodejs  
 tmi.js - Twitch IRC Chat (Twitch Messaging Interface)  
 dotenv - for loading environment variables  
 line-reader - For processing the files  

## Rate limits
Rate limits set as per; https://dev.twitch.tv/docs/irc/guide#rate-limits  
100 messages per 30 seconds max (can ban 1 user every 0.5sec to be safe)

You should not chat at the same time as running the bans from this bot as you may hit rate limits.  
Hitting rate limits can result in a perma ban!!

## Warranty
**There is literally no warranty on this bot.** Read and check the code for yourself before running it.  
**If you are unsure, dont run it.**  
**If you get banned this is NOT my fault in any way.** You were warned it was possible!!  
**Any damage, losses caused from use of this code, death, war, famine, natural disaster, etc (outcomes are not limited to this list specifically, bascially anything that happens because you ran this..) is not my responsibility.**

## BEFORE RUNNING:
Generate an oauth token from https://twitchapps.com/tmi/  
Edit the variables in example.env to your requirements for user and oauth token  
Variables must remain inside of the quote marks  
When happy with your config rename the file to .env (remove the word example from the file)  
From your directory run: node bot.js  
In your chat run: !banningrun
