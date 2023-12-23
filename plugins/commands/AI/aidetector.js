import axios from 'axios';

export const config = {
  name: 'aidetector',
  version: '1.0.0',
  credits: 'Grim',
  description: 'Analyze text using the sapling.ai API.',
  usage: '[text to detect]',
  cooldown: 5,
};

export async function onCall({ message, args, prefix }) {
  const textToAnalyze = args.join(' ');

  if (!textToAnalyze) {
    message.reply(`Please provide the text you want to analyze. Usage: ${prefix}${config.name} [text]`);
    return;
  }

  try {
    const response = await axios.post('https://api.sapling.ai/api/v1/aidetect', {
      key: 'TLROOOL9GFDTW954E7GDQE74RGJ9F8O1', // Replace with your actual API key
      text: textToAnalyze,
    });

    const { score, sentence_scores } = response.data;

    let resultMessage = `🤖 | 𝗔𝗜 𝗗𝗘𝗧𝗘𝗖𝗧𝗢𝗥 𝗥𝗘𝗦𝗨𝗟𝗧𝗦\n\n`;
    resultMessage += `𝗢𝘃𝗲𝗿𝗮𝗹𝗹 𝗦𝗰𝗼𝗿𝗲: ${score}\n`;

    if (sentence_scores && sentence_scores.length > 0) {
      resultMessage += '𝗦𝗲𝗻𝘁𝗲𝗻𝗰𝗲 𝗦𝗰𝗼𝗿𝗲𝘀:\n';
      sentence_scores.forEach((sentence) => {
        resultMessage += `  — 𝗦𝗲𝗻𝘁𝗲𝗻𝗰𝗲: ${sentence.sentence}\n`;
        resultMessage += `  — 𝗦𝗰𝗼𝗿𝗲: ${sentence.score}\n`;
      });
    }

    message.reply(resultMessage);
  } catch (error) {
    console.error('Error:', error);
    message.reply('An error occurred while analyzing the text. Please try again later.');
  }
}
