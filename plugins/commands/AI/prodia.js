export const config = {
  name: 'prodia',
  aliases: ['gen'],
  version: '1.0.0',
  credits: 'Grim',
  description: 'Generate image from text.',
  usage: '[Text] | [Number]',
  cooldown: 10
};

export async function onCall({ message, args, prefix }) {
  try {
    const info = args.join(' ');
    const [prompt, model] = info.split('|').map(item => item.trim());
    const text = args.join(" ");

    if (!text) {
      return message.reply(`❎ | Invalid usage!\nExample: ${prefix}generate Sample | 2`);
    }
    if (!model) {
      return message.reply(`⚠️ | Please provide a model number (1-45).\nExample: ${prefix}generate Sample | 2`)
    }
    if (model > 45) {
      return message.reply(`⚠️ | The maximum model number is 45!`)
    }
    message.react('⏳');
    const apiUrl = `https://arjhil-prodia-api.arjhilbard.repl.co/generate?prompt=${encodeURIComponent(prompt)}&model=${model}`;
    
    message.react('✅');
    await message.reply({
      body: "🖼️ | Generated Image!",
      attachment: await global.getStream(apiUrl)
    });

  } catch (error) {
    console.error(error);
    await message.reply("❎ | There's a problem with the API.");
  }
};
