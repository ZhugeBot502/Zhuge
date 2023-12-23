import axios from 'axios';
import fs from 'fs';
import path from 'path';

export const config = {
  name: "pixart",
  version: "4.1",
  credits: "Hazeyy",
  description: "( 𝙿𝚒𝚡𝙰𝚛𝚝 𝚇𝙻 )",
  usage: "( 𝙿𝚒𝚡𝙰𝚛𝚝 )",
  cooldown: 5,
};

export async function onCall({ message, args }) {
  const query = args.join(" ");

  if (query.length === 0) {
    message.reply("✨ | 𝙷𝚎𝚕𝚕𝚘 𝚝𝚘 𝚞𝚜𝚎 𝙿𝚒𝚡𝙰𝚛𝚝 𝚇𝙻.\n\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚞𝚜𝚎: 𝚙𝚒𝚡𝚊𝚛𝚝 [ 𝚙𝚛𝚘𝚖𝚙𝚝 ]");
    return;
  }

  message.reply("🕟 | 𝙿𝚒𝚡𝙰𝚛𝚝 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝙿𝚛𝚘𝚖𝚙𝚝, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...");

  try {
    const response = await axios.get('https://codemerge-api.hazeyy0.repl.co/pixart/api', {
      params: {
        prompt: query,
      },
    });

    console.log('🤖 | 𝙿𝚒𝚡𝙰𝚛𝚝 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎:', response.data);

    if (response.data) {
      const imageData = response.data;

      if (imageData && Array.isArray(imageData)) {
        const item = imageData[0];
        const image = await axios.get(item, { responseType: "arraybuffer" });
        const pathImg = path.join(global.cachePath, `${message.threadID}_${message.senderID}_pixart.jpg`);

        const promptMessage = `🤖 | 𝐏𝐢𝐱𝐀𝐫𝐭 ( 𝐀𝐈 )\n\n🖋️ | 𝙰𝚜𝚔: '${args.join(" ")}'\n\n✨ | 𝙿𝚛𝚘𝚖𝚙𝚝 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍:`;

        fs.writeFileSync(pathImg, image.data);

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