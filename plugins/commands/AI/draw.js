import axios from 'axios';

const badWords = ["gay", "pussy", "dick", "nude", "without", "clothes", "sugar", "fuck", "fucked", "step", "🤭", "🍼", "shit", "bitch", "hentai", "🥵", "clothes", "sugar", "fuck", "fucked", "step", "?", "?", "shit", "bitch", "hentai", "?", "sex", "fuck", "boobs", "cute girl undressed", "undressed", "nude", "without clothes", "without cloth", "boobies", "boobies", "tits", "titties", "milf", "busty", "brunette", "creampie", "gangbang", "thighs", "ass", "vagina"];
// Bad Words And CMD BY Ohio03\\

const config = {
  name: 'draw',
  version: '1.0',
  credits: 'JARiF × Ohio03 (Converted by Dymyrius)',
  description: 'Draw an image based on a prompt using Nax AI model.',
  usage: '[Your Prompt] | Model',
  cooldown: 10
};

async function onCall({ message, args, prefix }) {
  try {
    const info = args.join(' ');
    const [prompt, model] = info.split('|').map(item => item.trim());
    const text = args.join(" ");
    if (!text) {
      return message.reply(`❎ | Please Provide a Prompt and Model!\n\n───『 Models 』───\n1. Anime_Meina-V9\n2. Anime_Orangemix\n3. Anime_Meinamix-V11\nProper Usage:\n${prefix}draw Super dog | 2`);
    }

    if (containsBadWords(prompt)) {
      return message.reply('❎ | NSFW Prompt Detected');
    }

    const apiKey = 'emma_heesters_quiin'; // API KEY BY JARiF\\

    const modelParam = model || '3'; // Default Model Is 3\\

    const apiUrl = `https://jarif-draw.gadhaame.repl.co/imagine?model=${modelParam}&prompt=${encodeURIComponent(prompt)}&apikey=${apiKey}`;

    //const apiUrl = `https://www.annie-jarif.repl.co/animefy?model${modelParam}&prompt=${encodeURIComponent(prompt)}&apikey=${apiKey}`; // API BY JARiF\\

    await message.reply('Please Wait...⏳');

    const form = {
      body: "Here's Your Drawing 🎨",
    };

    form.attachment = [];
    form.attachment[0] = await global.getStream(apiUrl);

    message.reply(form);
  } catch (error) {
    console.error(error);
    await message.reply('❎ | Sorry, API Has Skill Issue');
  }
};

function containsBadWords(prompt) {
  const promptLower = prompt.toLowerCase();
  return badWords.some(badWord => promptLower.includes(badWord));
}

export default {
  config,
  onCall
}
