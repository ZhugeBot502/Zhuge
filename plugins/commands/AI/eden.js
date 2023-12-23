import axios from 'axios';

const config = {
  name: "eden",
  version: "1.0.0",
  credits: "August Quinn (Converted by Grim)",
  description: "Get a response from Eden AI",
  usage: "[prompt]",
  cooldown: 5,
};

async function onCall({ message, args }) {
  const prompt = args.join(" ");

  if (!prompt) {
    return message.reply("Hello there, how can I assist you today?");
  }

  try {
    message.react("🔴");
    const response = await axios.post('https://eden.august-api.repl.co/Eden', { prompt });
    const responseData = response.data;
    message.react("🟢");
    message.reply(`${responseData.openai.generated_text}`);
  } catch (error) {
    message.react("❌");
    console.error('ERROR', error.response?.data || error.message);
    message.reply('An error occurred while processing the command.');
  }
};

export default {
  config,
  onCall
}