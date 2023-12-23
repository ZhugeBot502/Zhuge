import axios from 'axios';

export const config = {
  name: "sdxl",
  version: "30.0.0",
  credits: "arjhil (Converted by Grim)",
  description: "Generate image AI",
  usages: "[text] | [model]",
  cooldown: 5
};

export async function onCall({ message, args, prefix }) {
  try {
    let text = args.join(" ");
    const prompt = text.substr(0, text.indexOf(" | "));
    const model = text.split(" | ").pop();

    if (!prompt || !model) {
      return message.reply(`Please provide a prompt and a model. For example: ${prefix}${config.name} Dog | 3`);
    }

    const wait = await message.reply("⏳ | Generating your request, please wait...")

    const encodedPrompt = encodeURIComponent(prompt);
    const providedURL = `https://arjhil-prodia-api.arjhilbard.repl.co/sdxl/generate?prompt=${encodedPrompt}&model=${model}`;

    const response = await axios.get(providedURL, { responseType: 'stream' });

    global.api.unsendMessage(wait.messageID);
    message.reply({
      attachment: response.data,
    });
  } catch (error) {
    console.error(error);
    message.reply('An error occurred while processing the sdxl command.');
  }
};