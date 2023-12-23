import axios from 'axios';
  
export const onfig = {
  name: "autocorrect",
  version: "2.0.5",
  credits: "Someone",
  description: "Auto correction text.",
  cooldown: 5,
};

export async function onCall({ message, args }) {
  const content = encodeURIComponent(args.join(" "));

  const prompt = `Correct%20the%20spelling%20and%20the%20sentence%20of%20this%20message\n%20${content}`
  if (!args[0]) return message.reply("Missing input!");
  try {
    const res = await axios.get(`https://api.easy0.repl.co/api/blackbox?query=${prompt}`);
    const respond = res.data.response;
    if (res.data.error) {
      message.reply(`Error: ${res.data.error}`, (error, info) => {
        if (error) {
          console.error(error);
        }
      });
    } else {
      message.reply(respond, (error, info) => {
        if (error) {
          console.error(error);
        }
      });
    }
  } catch (error) {
    console.error(error);
    message.reply("Error, something wrong with the api.");
  }
};