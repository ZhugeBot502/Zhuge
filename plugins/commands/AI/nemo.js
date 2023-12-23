import axios from 'axios';

export default {
  config: {
    name: "nemo",
    aliases: [""],
    version: 2.0,
    credits: "OtinXSandip",
    description: "ai with diff utilities",
    usage: "questions | sdxl | imagine | art | gen | draw",
    cooldown: 8
  },
  
  onCall: async function({ message, args, prefix }) {
    try {
      const id = message.senderID;
      const name = await global.controllers.Users.getName(message.senderID);
      const prompt = args.join(" ");

      if (!prompt) {
        return message.reply(`Please provide questions or\n${prefix}nemo gen cat\n${prefix}nemo draw cat\n${prefix}nemo art\n${prefix}nemo imagine\n${prefix}nemo sdxl`);
      }

      const encodedPrompt = encodeURIComponent(prompt);

      if (prompt.includes("sdxl")) {
        const [promptText, model] = args.join(' ').split('|').map((text) => text.trim());
        const puti = model || "2";
        const baseURL = `https://sdxl.otinxsandeep.repl.co/sdxl?prompt=${promptText}&model=${puti}`;

        message.reply({
          body: `${name}`,
          attachment: await global.getStream(baseURL)
        });
      } else if (prompt.includes("imagine")) {
        let promptText, model;
        if (prompt.includes("|")) {
          [promptText, model] = prompt.split("|").map((str) => str.trim());
        } else {
          promptText = prompt;
          model = 19;
        }

        const a = "milanbhandari";
        const b = "imageapi";
        const response = await axios.get(`https://${a}.${b}.repl.co/milanisgodig?prompt=${encodeURIComponent(promptText)}&model=${model}`);
        const img = response.data.combinedImageUrl;
        message.reply({
          body: `${name}`,
          attachment: await global.getStream(img)
        });
      } else if (prompt.includes("draw")) {
        const [promptText, model] = args.join(' ').split('|').map((text) => text.trim());
        const puti = model || "5";
        const baseURL = `https://sandyapi.otinxsandeep.repl.co/jeevan?prompt=${promptText}&model=${puti}`;

        message.reply({
          body: `${name}`,
          attachment: await global.getStream(baseURL)
        });
      } else if (prompt.includes("gen")) {
        const [promptText, model] = args.join(' ').split('|').map((text) => text.trim());
        const puti = model || "19";
        const baseURL = `https://sdxl.otinxsandeep.repl.co/gen?prompt=${promptText}&model=${puti}`;

        message.reply({
          body: `${name}`,
          attachment: await global.getStream(baseURL)
        });
      } else if (prompt.includes("art")) {
        const imgurl = encodeURIComponent(message.messageReply.attachments[0].url);

        const [promptText, model] = prompt.split('|').map((text) => text.trim());
        const puti = model || "37";

        const lado = `https://sandyapi.otinxsandeep.repl.co/art?imgurl=${imgurl}&prompt=${encodeURIComponent(promptText)}&model=${puti}`;
        const attachment = await global.getStream(lado);
        message.reply({
          body: `${name}`,
          attachment,
        });
      } else {
        const response = await axios.get(`https://sandyapi.otinxsandeep.repl.co/api/ai?query=${encodedPrompt}`);
        const lado = response.data.answer;

        message.reply({
          body: `${name}${lado}`
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
};