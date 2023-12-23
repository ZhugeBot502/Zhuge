import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';

export const config = {
  name: "dalle",
  version: "1.0.0",
  credits: "August Quinn",
  description: "Generate images with DALL-E.",
  usage: "[text]",
  cooldown: 5,
};

export async function onCall({ args, message }) {
  try {
    const text = args.join(" ");

    await message.react("⏳");
    const apiUrl = 'http://openai-dall-e.august-quinn-api.repl.co/generate-images';
    const response = await axios.post(apiUrl, { text, num_images: 4 });

    const imgData = [];

    for (let i = 0; i < response.data.openai.items.length; i++) {
      const imgUrl = response.data.openai.items[i].image_resource_url;

      if (imgUrl) {
        const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        const imgPath = path.join(global.cachePath, `${message.threadID}_dalle_${i + 1}.jpg`);

        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }
    }

    if (imgData.length > 0) {
      message.react("✅");
      await message.reply({
        body: `Generated Images with DALL-E:`,
        attachment: imgData
      });

      // Delete images after sending them as attachments
      for (const stream of imgData) {
        const imgPath = stream.path;
        await fs.unlink(imgPath);
      }
    } else {
      await message.reply('No images generated.');
    }

  } catch (error) {
    console.error(error);
    message.react("❌");
    await message.reply(`Image generation failed!\nError: ${error.message}`);
  }
};
