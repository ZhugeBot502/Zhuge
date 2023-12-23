import axios from 'axios';
import fs from 'fs';
import path from 'path';

export const config = {
  name: "midjourney",
  version: "1.1",
  hasPermssion: 0,
  credits: "Hazeyy",
  description: "( 𝙼𝚒𝚍𝚓𝚘𝚞𝚛𝚗𝚎𝚢 )",
  usage: "( 𝙼𝚘𝚍𝚎𝚕 - 𝙾𝚙𝚎𝚗𝚓𝚘𝚞𝚛𝚗𝚎𝚢 )",
  cooldown: 5,
};

export async function onCall({ message }) {
  const args = message.body.split(/\s+/);
  args.shift();

  if (args.length === 0) {
    message.reply("✨ 𝙷𝚎𝚕𝚕𝚘 𝚝𝚘 𝚞𝚜𝚎 𝙼𝚒𝚍𝚓𝚘𝚞𝚛𝚗𝚎𝚢.\n\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚞𝚜𝚎: 𝚖𝚒𝚍𝚓𝚘𝚞𝚛𝚗𝚎𝚢 [ 𝚙𝚛𝚘𝚖𝚙𝚝 ]");
    return;
  }

  message.reply("🕟 | 𝙼𝚒𝚍𝚓𝚘𝚞𝚛𝚗𝚎𝚢 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝙿𝚛𝚘𝚖𝚙𝚝, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...");

  try {
    const response = await axios.get('https://codemerge-api.hazeyy0.repl.co/openjourney/api', {
      params: { prompt: args.join(' ') }
    });

    if (response.data.output) {
      const imageData = response.data.output;

      console.log("🤖 | 𝙰𝙿𝙸 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎:", response.data);

      if (imageData && Array.isArray(imageData)) {
        const item = imageData[0];
        const image = await axios.get(item, { responseType: "arraybuffer" });
        const pathImg = path.join(global.cachePath, `${message.threadID}_${message.senderID}_midjourney.jpg`);

        const promptMessage = `🤖 | 𝐌𝐢𝐝𝐣𝐨𝐮𝐫𝐧𝐞𝐲 ( 𝐀𝐈 )\n\n🖋️ | 𝙿𝚛𝚘𝚖𝚙𝚝: '${args.join(" ")}'\n\n✨ | 𝙿𝚛𝚘𝚖𝚙𝚝 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍:`;

        fs.writeFileSync(pathImg, image.data);

        message.reply({ body: promptMessage, attachment: fs.createReadStream(pathImg) }, () => {
          fs.unlinkSync(pathImg);
        });
      } else {
        message.reply("🚫 | 𝙽𝚘 𝚒𝚖𝚊𝚐𝚎 𝚏𝚘𝚞𝚗𝚍 𝚒𝚗 𝚝𝚑𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎.");
      }
    } else {
      message.reply("🚫 | 𝙽𝚘 𝚍𝚊𝚝𝚊 𝚏𝚘𝚞𝚗𝚍 𝚒𝚗 𝚝𝚑𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎.");
    }
  } catch (error) {
    console.error("🚫 | 𝙴𝚛𝚛𝚘𝚛:", error.message);
    message.reply("🚫 | 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚝𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝.");
  }
};
