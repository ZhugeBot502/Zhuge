import axios from 'axios';

export const config = {
  name: "airoboros",
  version: "1.0.0",
  credits: "Grim",// credits the api by hazeyy
  description: "Get response from Airoboros",
  usage: "[your question]",
  cooldown: 10,
};

export async function onCall({ message, args }) {
  if (!args[0]) return message.reply("Please input your question");
  const question = encodeURIComponent(args.join(" "));
  const apiUrl = `http://hazeyy-apis-combine.kyrinwu.repl.co/api/try/airoboros?prompt=${question}`;

  try {
    message.reply("⏱️ | Please wait...");
    const response = await axios.get(apiUrl);
    if (response.status == 200) {
      const result = response.data;
      if (result && result.response) {
        message.reply(result.response);
      }
    }
    else {
      message.reply("Airoboros did not provide a valid response.");
    }
  } catch (error) {
    message.reply("Sorry, I can't get a response from Airoboros at the moment.");
    console.error(error);
  }
};