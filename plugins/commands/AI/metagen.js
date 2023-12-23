import axios from 'axios';
import path from 'path';
import fs from 'fs';

const config = {
  name: "metagen",
  aliases: [""],
  version: "1.0.0",
  permissions: [0],
  credits: "JARiF",
  description: "Meta AI Image Generator.",
  cooldown: 5
};

async function onCall({ args, message }) {
  try {
    const prompt = args.join(" ");

    const waitingMessage = await message.reply("⏳ | Please wait...");

    const url = `https://project-meta.onrender.com/meta?prompt=${encodeURIComponent(prompt)}`;

    const response = await axios.get(url);
    const data = response.data;

    if (!data || data.length === 0) {
      throw new Error("Empty response or no images generated.");
    }

    const imgData = [];

    for (let i = 0; i < data.length; i++) {
      const imgUrl = data[i];
      const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
      const imgPath = path.join(global.cachePath, `${message.threadID}_${Date.now()}_${i + 1}.jpg`);
      await fs.promises.writeFile(imgPath, imgResponse.data);
      imgData.push(fs.createReadStream(imgPath));
    }

    global.api.unsendMessage(waitingMessage.messageID);
    await message.reply({
      body: `✅ | Generated Successfully!`,
      attachment: imgData
    });

    for (let i = 0; i < imgData.length; i++) {
      const imgPath = imgData[i].path;
      await fs.promises.unlink(imgPath);
    }

  } catch (error) {
    console.error(error);
    message.reply(`Generation failed!\nError: ${error.message}`);
  }
};

export default {
  config,
  onCall
}
