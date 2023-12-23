import axios from 'axios';

export const config = {
  name: "rexai",
  version: "1.0.0",
  credits: "August Quinn (Converted by Grim)",
  description: "Rexai (Reseach-Expert-AI)",
  usage: "[prompt]",
  cooldown: 5,
};

export async function onCall({ message, args }) {
  const prompt = args.join(" ");

  if (!prompt) {
    return message.reply("Provide a title to proceed.");
  }

  try {
    message.react("⏳");
    const response = await axios.post('https://rexai-reseach-expert-ai.august-api.repl.co/Title', { prompt });
    const responseData = response.data;

    message.react("✅");
    message.reply(`${responseData.google.generated_text}`);
  } catch (error) {
    console.error('ERROR', error.response?.data || error.message);
    message.react("❌");
    message.reply('An error occurred while processing the command.');
  }
};
