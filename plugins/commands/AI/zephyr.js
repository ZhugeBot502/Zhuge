import axios from 'axios';

export const config = {
  name: 'zephyr',
  version: '1.0.0',
  credits: 'Grim',
  description: 'Talk to Zephyr AI.',
  cooldown: 7,
  usage: '[text]'
};

export async function onCall ({ message, args }) {
  const prompt = args.join();
  if (!prompt) return message.reply('Please provide a prompt!')
  try {
    message.react("⏳");
    const response = await axios.get(`https://ai.easy-api.repl.co/api/zephyr?query=${prompt}`);
    const data = response.data.content;

    message.react("✅");
    message.reply(data);
  } catch (error) {
    message.react("❎");
    console.log(error);
    message.reply('Something wrong with the API right now.')
  }
}