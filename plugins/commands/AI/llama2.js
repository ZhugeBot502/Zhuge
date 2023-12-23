import axios from 'axios';

export const config = {
  name: "llama2",
  version: "1.0.0",
  credits: "August Quinn (Converted by Grim)",
  description: "Get a llama response.",
  commandCategory: "AI",
  usage: "[prompt]",
  cooldown: 5,
};

export async function onCall({ message, args }) {
  const prompt = args.join(" ");

  if (!prompt) {
    return message.reply("Please provide a prompt for the llama.");
  }

  try {
    message.react("🦙");
    const response = await axios.get(`https://llama.august-api.repl.co/llama?prompt=${encodeURI(prompt)}`);
    const llamaResponse = response.data.response;

    const messages = {
      body: `🦙 | 𝗟𝗟𝗔𝗠𝗔 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘:\n\n${llamaResponse}`,
    };

    message.react("✅");
    message.reply(messages);
  } catch (error) {
    console.error('[ERROR]', error);
    message.reply('An error occurred while processing the command.');
  }
};