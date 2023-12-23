import axios from 'axios';
import { writeFileSync, createReadStream, unlinkSync } from 'fs';
import path from 'path';

export const config = {
  name: "remini",
  version: "1.0.0",
  credits: "Who's Deku (Converted by Grim)",
  description: "Remini filter",
  usage: "[reply to image or image url]",
  cooldown: 1,
};

export async function onCall({ message, args }) {
  if (message.type == "message_reply") {
    var attach = message.messageReply.attachments[0].url
  } else {
    var attach = args.join(" ");
  }
  try {
    const wait = await message.reply("⏳ | Enhancing...");
    const response = await axios.get("https://free-api.ainz-sama101.repl.co/canvas/remini?", {
      params: {
        url: encodeURI(attach)
      }
    });
    const result = response.data.result.image_data;
    let imgPath = path.join(global.cachePath, `${message.threadID}_${Date.now()}_remini.png`);
    let img = (await axios.get(result, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(imgPath, Buffer.from(img, "utf-8"));
    global.api.unsendMessage(wait.messageID);
    return message.reply({ body: "🖼️ | Here's your enhanced image:", attachment: createReadStream(imgPath) }, () => unlinkSync(imgPath))
  } catch (err) {
    console.log(err.message);
    return message.reply("Something went wrong.\n" + err.message)
  }
}