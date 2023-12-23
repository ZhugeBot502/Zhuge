import axios from 'axios';
import fs from 'fs';
import path from 'path';

export const config = {
  name: "sdxlgta",
  version: "4.9",
  credits: "Hazeyy",
  description: "( 𝙶𝚃𝙰-𝚅 )",
  usage: "( 𝙼𝚘𝚍𝚎𝚕 - 𝚂𝙳𝚇𝙻 - 𝙶𝚃𝙰-𝚅 )",
  cooldown: 8,
};

export async function onCall({ message }) {

  const prompt = args.join(" ");

  if (!prompt) {
    message.reply("✨ | 𝙷𝚎𝚕𝚕𝚘 𝚝𝚘 𝚞𝚜𝚎 𝚂𝚍𝚡𝚕 𝙶𝚃𝙰-𝚅.\n\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚞𝚜𝚎: 𝚐𝚝𝚊 [ 𝚙𝚛𝚘𝚖𝚙𝚝 ]");
    return;
  }

  const wait = await message.reply("🕟 | 𝙶𝚃𝙰-𝚅 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝙿𝚛𝚘𝚖𝚙𝚝, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...");

  try {
    const response = await axios.get('https://codemerge-api.hazeyy0.repl.co/sdxl/gta5/api', {
      params: {
        prompt: prompt,
      },
    });

    if (response.data.output) {
      const imageData = response.data.output;

      if (imageData && Array.isArray(imageData)) {
        const item = imageData[0];
        const image = await axios.get(item, { responseType: "arraybuffer" });
        const pathImg = path.join(global.cachePath, `${Date.now()}_${message.threadID}.jpg`);

        const promptMessage = `🤖 | 𝐆𝐓𝐀-𝐕 ( 𝐀𝐈 )\n\n🖋️ | 𝙰𝚜𝚔: '${prompt}'\n\n✨ | 𝙿𝚛𝚘𝚖𝚙𝚝 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍:`;

        fs.writeFileSync(pathImg, image.data);

        await global.api.unsendMessage(wait.messageID);
        message.reply({ body: promptMessage, attachment: fs.createReadStream(pathImg) }, () => {
          fs.unlinkSync(pathImg);
        });
      }
    } else {
      message.reply('🚫 | 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚍𝚞𝚛𝚒𝚗𝚐 𝚝𝚑𝚎 𝙿𝚒𝚡𝙰𝚛𝚝 𝚙𝚛𝚘𝚌𝚎𝚜𝚜.');
    }
  } catch (error) {
    console.error('🚫 | 𝙴𝚛𝚛𝚘𝚛:', error);
    message.reply('🚫 | 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.');
  }
};