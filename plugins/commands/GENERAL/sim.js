import fetch from "node-fetch";

const config = {
  "name": "sim",
  "aliases": ["simsimi"],
  "description": "Chat with Sim",
  "usage": "<text>",
  "cooldown": 3,
  "permissions": [0, 1, 2],
  "credits": "WaifuCat (Fixed by Grim)",
  "extra": {}
};

async function onCall({message, args}) {
  const content = encodeURIComponent(args.join(" "));
  global.api.sendTypingIndicator(message.threadID);
  const url = `https://simsimi.fun/api/v2/?mode=talk&lang=en&message=${content}&filter=false`;
  const apiResponse = await fetch(url);
  const responseJson = await apiResponse.json();

  if (responseJson.success) {
    message.reply(responseJson.success);
  } else {
    message.reply("Sorry, I couldn't understand your message.");
  }
}

export default {
  config,
  onCall,
};