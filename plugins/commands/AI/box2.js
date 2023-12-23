import axios from 'axios';
import fs from 'fs';
import { resolve } from 'path';
import path from 'path';

const config = {
  name: "box2",
  version: "1.2.0",
  credits: "Hazeyy (Converted by Grim)",
  usage: "[query]",
  description: "(Get answers with Generated Images from Phyton AI)",
  cooldown: 5,
};

let lastQuery = "";

async function onCall({ api, message }) {
  const args = message.body.split(/\s+/);
  args.shift();
  message.react("📝", (err) => { }, true);

  const { threadID, messageID } = message;

  if (!args[0]) {
    message.reply("Please provide me a query to search on Python AI.");
    return;
  }

  const query = args.join(" ");

  if (query === lastQuery) {
    message.reply("🕰️ | Requested answer to previous question.");
    return;
  } else {
    lastQuery = query;
  }

  const search = await global.api.sendMessage("🕝 | Searching...", threadID, messageID);

  try {
    const response = await axios.get(`https://hazeyy-api-blackbox.kyrinwu.repl.co/ask?q=${encodeURIComponent(query)}`);

    if (response.status === 200 && response.data && response.data.message) {
      const answer = response.data.message;
      const formattedAnswer = formatFont(answer);
      global.api.unsendMessage(search.messageID)
      global.api.sendMessage(`🧠 My Answer\n\n📝: ${formattedAnswer} `, threadID, messageID);
    } else {
      message.reply("Sorry, no relevant answers found.");
    }
  } catch (error) {
    console.error(error);
    message.reply("Unexpected Error, while searching on Python AI.");
  }

  const imgData = await searchPinterest(query);

  if (imgData && imgData.length > 0) {
    global.api.sendMessage({
      body: `📸 Here are some images related to your query:`,
      attachment: imgData,
    }, threadID, messageID);
  } else {
    message.reply("Unexpected Error, while fetching images.");
  }
}

const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function searchPinterest(query) {
  try {
    const res = await axios.get(`https://api-dien.kira1011.repl.co/pinterest?search=${encodeURIComponent(query)}`);
    const data = res.data.data;
    const imgData = [];

    for (let i = 0; i < 6; i++) {
      const pathImg = resolve(__dirname, `cache/${i + 1}.jpg`);
      const imageResponse = await axios.get(data[i], { responseType: 'arraybuffer' });
      fs.writeFileSync(pathImg, Buffer.from(imageResponse.data, 'binary'));
      imgData.push(fs.createReadStream(pathImg));
    }

    for (let i = 1; i < 6; i++) {
      fs.unlinkSync(resolve(__dirname, `cache/${i}.jpg`));
    }

    return imgData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function formatFont(text) {
  const fontMapping = {
    a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆",
    n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
    A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬",
    N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹"
  };

  let formattedText = "";
  for (const char of text) {
    if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }

  return formattedText;
}

export default {
  config,
  onCall
};
