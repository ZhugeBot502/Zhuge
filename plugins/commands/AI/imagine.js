export default {
  config: {
    name: 'imagine',
    version: '1.0',
    credits: 'rehat--',
    cooldown: 8,
    description: 'Text to Image',
    usage: '[prompt] - [model]'
  },

  onCall: async function({ message, args, prefix }) {
    try {
      const info = args.join(' ');
      const [prompt, model] = info.split('|').map(item => item.trim());
      const text = args.join("");
      if (!text) {
        return message.reply(`❎ | Please provide a prompt.\nAvailable Models:\n1 | DreamshaperXL10\n2 | DynavisionXL\n3 | JuggernautXL\n4 | RealismEngineSDXL\n5 | Sdxl 1.0\nFor Example:\n${prefix}${config.name} Dog | 3`)
      };

      if (model > 5) {
        return message.reply("There's only 5 models available.\nAvailable Models:\n1 | DreamshaperXL10\n2 | DynavisionXL\n3 | JuggernautXL\n4 | RealismEngineSDXL\n5 | Sdxl 1.0")
      }
      const modelParam = model || '2';
      const apiUrl = `https://prodia-xl.api-tu33rtle.repl.co/api/sdxl?prompt=${prompt}&model=${modelParam}`;

      const wait = await message.reply('⏳ | Please Wait...');

      const form = {
      };
      form.attachment = [];
      form.attachment[0] = await global.getStream(apiUrl);

      global.api.unsendMessage(wait.messageID);
      message.reply(form);
    } catch (error) {
      console.error(error);
      await message.reply('❎ | Sorry, API Have Skill Issue');
    }
  }
};