import axios from 'axios';

export const config = {
  name: 'gitiai',
  version: '1.0.0',
  credits: 'Grim',
  description: 'Talk to Giti-AI.',
  cooldown: 7,
  usage: '[query]'
};

export async function onCall ({ message, args }) {
  const prompt = args.join();
  if (!prompt) return message.reply('Palihug paghatag ug pangutana!')
  try {
    message.react("⏳");
    const response = await axios.get(`https://celestial-dainsleif-docs.archashura.repl.co/gitiai?ask=${prompt}`);
    const data = response.data.content;

    message.react("✅");
    message.reply(data);
  } catch (error) {
    message.react("❎");
    console.log(error);
    message.reply('Naay problema sa API.')
  }
}