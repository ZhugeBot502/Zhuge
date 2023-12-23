import axios from 'axios';
import request from 'request';
import fs from 'fs';
import path from 'path';

export const config = {
  name: "shotiviet",
  version: "1",
  credits: "MARJHUN BAYLON (Converted by Grim)", // WAG MO PALITAN CRED KUNDI MAG SISISI KA
  description: "Random shawty from Vietnam",
  cooldown: 5
};

export async function onCall({ message }) {
  message.react("⏳");
  axios.get('https://jeka-api.luabot24.repl.co/tiktok/?apikey=geloo').then(res => {
    let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
    let pathImg = path.join(
      global.cachePath,
      `shawty_${message.messageID}.${ext}`
    );
    let callback = function() {
      message.react("✅");
      message.reply({
        body: `HERE'S YOUR SHOTI FROM VIETNAM`,
        attachment: fs.createReadStream(pathImg)
      }, () => fs.unlinkSync(pathImg));
    };
    request(res.data.url).pipe(fs.createWriteStream(pathImg)).on("close", callback);
  }).catch(err => {
    message.reply("[ Shawty ]\nApi Error Status: 200")
  })
}