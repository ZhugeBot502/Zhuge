import axios from 'axios';
import path from 'path';
import fs from 'fs';

export const config = {
  name: 'xbard',
  version: '1.0.0',
  credits: 'Ivan Cotacte',
  description: 'An BardAI with Image recognition!',
  usage: '[query]',
  cooldown: 5,
};

export async function onCall({ message, args }) {
  const prompt = args.join(' ');
  let credits = config.credits;

  if (!prompt) {
    message.reply("Mf, you forgot the query.");
  };

  let imageUrl;
  let cookie = process.env['BARD_1PSID']; //////// Need Cookie ///////

  if (message.type === 'message_reply' && message.messageReply.attachments) {
    const attachment = message.messageReply.attachments[0];
    if (attachment.type === 'photo' || attachment.type === 'audio') {
      imageUrl = attachment.url;
    }
  }

  try {
    message.react("⏱️");
    const res = await axios.post('https://bard.ivancotacte.repl.co/', {
      message: prompt,
      credits: credits,
      image_url: imageUrl,
      cookie: cookie,
    });
    const imageUrls = res.data.imageUrls;
    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      const attachments = [];

      for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const imagePath = path.join(global.cachePath, `xbare _image_${message.threadID}_${i + 1}.png`);

        try {
          const imageResponse = await axios.get(url, { responseType: "arraybuffer" });
          fs.writeFileSync(imagePath, imageResponse.data);

          attachments.push(fs.createReadStream(imagePath));
        } catch (error) {
          console.error("Error occurred while downloading and saving the image:", error);
        }
      }

      message.reply(
        {
          attachment: attachments,
          body: res.data.message,
        },
        () => {
          fs.unlinkSync(imagePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("File deleted successfully");
            }
          });
        }
      );
      message.react("✅");
    } else {
      message.reply(res.data.message);
      message.react("✅");
    }
  } catch (error) {
    console.error('Error:', error);
    message.react("❌");
  }
};