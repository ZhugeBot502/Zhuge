import axios from 'axios';

export default {
  config: {
    name: "palm",
    aliases: ["palm"],
    version: "1.0",
    credits: "Samir Œn (Converted by Grim)",
    description: "Ask a question to Palm2",
    usage: "[question]"
  },
  onCall: async function ({ message, args }) {
    const question = args.join(" ");

    if (!question) {
      return message.reply("Please provide a question to ask palm.");
    } else {
      try {
        message.react("🫳🏻");
        const response = await axios.get(`https://google.odernder.repl.co/palm?text=${encodeURIComponent(question)}`);
        const Answer = response.data.output;
        message.react("🫴🏻");
        message.reply(Answer);
      } catch (e) {
        console.error(e);
        message.react("❌");
        message.reply("Error while fetching the palm response.");
      }
    }
  }
};
