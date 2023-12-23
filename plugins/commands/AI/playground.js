import axios from 'axios';
import fs from 'fs';
import path from 'path';

export const config = {
  name: "playground",
  version: "3.2",
  credits: "Hazeyy",
  description: "( 𝙿𝚕𝚊𝚢𝚐𝚛𝚘𝚞𝚗𝚍 - 𝚟2 )",
  commandCategory: "𝚗𝚘 𝚙𝚛𝚎𝚏𝚒𝚡",
  usage: "( 𝙼𝚘𝚍𝚎𝚕 - 𝙿𝚕𝚊𝚢𝚐𝚛𝚘𝚞𝚗𝚍 1024𝚙𝚡 - 𝚊𝚎𝚜𝚝𝚑𝚎𝚝𝚒𝚌 )",
  cooldown: 8,
};

export async function onCall({ message }) {

  const prompt = args.join(" ");

  if (!prompt) {
    message.reply("✨ | 𝙷𝚎𝚕𝚕𝚘 𝚝𝚘 𝚞𝚜𝚎 𝙿𝚕𝚊𝚢𝚐𝚛𝚘𝚞𝚗𝚍 𝙰𝙸.\n\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚞𝚜𝚎: 𝚙𝚕𝚊𝚢 [ 𝚙𝚛𝚘𝚖𝚙𝚝 ]");
    return;
  }

  const wait = await message.reply("🕟 | 𝙿𝚕𝚊𝚢 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝙿𝚛𝚘𝚖𝚙𝚝, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...");

  try {
    const response = await axios.get('https://codemerge-api.hazeyy0.repl.co/play/api', {
      params: {
        prompt: prompt,
      },
    });

    console.log('🤖 | 𝙿𝚕𝚊𝚢 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎:', response.data);

    if (response.data.output) {
      const imageData = response.data.output;

      if (imageData && Array.isArray(imageData)) {
        const item = imageData[0];
        const image = await axios.get(item, { responseType: "arraybuffer" });
        const pathImg = path.join(global.cachePath, `${Date.now()}_${message.threadID}.jpg`);

        const promptMessage = `🤖 | 𝐏𝐥𝐚𝐲 ( 𝐀𝐈 )\n\n🖋️ | 𝙰𝚜𝚔: '${prompt}'\n\n✨ | 𝙿𝚛𝚘𝚖𝚙𝚝 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍:`;

        fs.writeFileSync(pathImg, image.data);

        await global.api.unsendMessage(wait.messageID);
        message.reply({ body: promptMessage, attachment: fs.createReadStream(path) }, () => {
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