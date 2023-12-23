import axios from 'axios';

export const config = {
  name: "alpha",
  version: "1.0.0",
  credits: "Jonell Magallanes",// credits the api by hazeyy
  description: "Get response from Alpha",
  usage: "[your question]",
  cooldown: 10,
};

export async function onCall({ message, args }) {
  if (!args[0]) return message.reply("Please input your question");
  const question = encodeURIComponent(args.join(" "));
  const apiUrl = `http://hazeyy-api-useless.kyrinwu.repl.co/api/try/alpha7b/beta?prompt=${question}`;

  try {
    message.reply("⏱️ | Please wait...");
    const response = await axios.get(apiUrl);
    if (response.data && response.data.bot_response && response.data.bot_response.trim() !== "") {
      message.reply(response.data.bot_response);
    } else {
      message.reply("Alpha did not provide a valid response.");
    }
  } catch (error) {
    message.reply("Sorry, I can't get a response from Replit AI at the moment.");
    console.error(error);
  }
};