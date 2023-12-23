import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';

export const config = {
  name: "poli",
  version: "1.0.",
  credits: "𝗜𝘀𝗹𝗮𝗺𝗶𝗰𝗸 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁",
  description: "generate image from polination",
  usage: "[query]",
  cooldown: 5,
};

export async function onCall({ message, args }) {
  let query = args.join(" ");
  if (!query) return message.reply("Missing query!");
let pathPoli = path.join(global.cachePath, `${message.threadID}_${Date.now()}_polinations.png`);
  await message.react("⏳");
  const poli = (await axios.get(`https://image.pollinations.ai/prompt/${query}`, {
    responseType: "arraybuffer",
  })).data;
  fs.writeFileSync(pathPoli, Buffer.from(poli, "utf-8"));
  message.react("☑️");
  message.reply({
    body: "🖼️ | Generated Image:",
    attachment: fs.createReadStream(pathPoli) }, () => fs.unlinkSync(pathPoli));
};