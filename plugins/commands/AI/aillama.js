import axios from 'axios';

export const config = {
  name: "aillama",
  version: "1.0",
  credits: "JARiF",
  cooldown: 5,
  description: "LLAMA: A Large Language Model."
};

export async function onCall({ message, args }) {
  try {
    const khankirChele = args.join(" ");
    let imageUrl;

    if (message.type === "message_reply") {
      if (["photo", "sticker"].includes(message.messageReply.attachments?.[0]?.type)) {
        imageUrl = message.messageReply.attachments[0].url;
      } else {
        return message.reply("⚠️ | Reply must be an image.");
      }
    } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
      imageUrl = args[0];
    } else if (!khankirChele) {
      return message.reply("⚠️ | Reply to an image or provide a prompt.");
    }

    if (imageUrl) {
      const response = await axios.get(`https://www.api.vyturex.com/llama?prompt=${khankirChele}&imageUrl=${encodeURIComponent(imageUrl)}`);
      const description = response.data;

      await message.reply(description);
    } else if (khankirChele) {
      const response = await axios.get(`https://www.api.vyturex.com/llama?prompt=${encodeURIComponent(khankirChele)}`);
      const prompt = response.data;

      await message.reply(prompt);
    }
  } catch (error) {
    console.error(error);
    message.reply(`❌ | ${error}`);
  }
};