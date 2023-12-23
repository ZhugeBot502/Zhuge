import axios from 'axios';

export const config = {
  name: "math",
  version: "1.0.0",
  credits: "Samir Œ",
  description: "Get math questions solved.",
  usage: "[prompt]",
  cooldown: 5,
};

export async function onCall({ message, args }) {
  const prompt = args.join(" ");

  if (!prompt) {
    return message.reply("Please provide a question.");
  }

  try {
    const response = await axios.get(`https://bnw.samirzyx.repl.co/mathai?q=${encodeURI(prompt)}`);
    const mathai = response.data.data;

    const messages = `Result: ${mathai}`;
    message.reply(messages);
  } catch (error) {
    console.error('[ERROR]', error);
    message.reply('An error occurred while processing the command.');
  }
};