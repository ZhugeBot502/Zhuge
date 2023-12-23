import axios from 'axios';
import fs from 'fs';
import gtts from 'gtts';
import path from 'path';

const config = {
  name: "bard",
  version: "1.0.0",
  credits: "Arjhil (Converted by Grim)",
  description: "Bard AI, Pinterest Image Search, and gTTS",
  usage: "<query>",
  cooldown: 10,
};

async function convertImageToText(imageURL) {
  try {
    const response = await axios.get(`https://api.heckerman06.repl.co/api/other/img2text?input=${encodeURIComponent(imageURL)}`);
    return response.data.extractedText;
  } catch (error) {
    console.error("Error converting image to text:", error);
    return null;
  }
}

function formatFont(text) {
  const fontMapping = {
    a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆",
    n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
    A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬",
    N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹",
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

async function onCall({ api, message, args }) {
  const { threadID, messageID, type, messageReply, body } = message;
  let question = "";

  if (type === "message_reply" && messageReply.attachments[0]?.type === "photo") {
    const attachment = messageReply.attachments[0];
    const imageURL = attachment.url;
    question = await convertImageToText(imageURL);

    if (!question) {
      message.reply("❌ Failed to convert the photo to text. Please try again with a clearer photo.");
      return;
    }
  } else {
    question = args.join(" ").trim();

    if (!question) {
      message.reply("Please provide a question or query");
      return;
    }
  }

  message.reply("🔎 | 𝑺𝒆𝒂𝒓𝒄𝒉𝒊𝒏𝒈 𝒇𝒐𝒓 𝒂𝒏 𝒂𝒏𝒔𝒘𝒆𝒓, 𝒑𝒍𝒆𝒂𝒔𝒆 𝒘𝒂𝒊𝒕...");

  try {

    //const bardResponse = await axios.get(`https://bard-ai.arjhilbard.repl.co/bard?ask=${encodeURIComponent(question)}`);
    const bardResponse = await axios.get(`https://api-bard-kyouya.files120.repl.co/bard?ask=${encodeURIComponent(question)}`);
    const bardData = bardResponse.data;
    const bardMessage = bardData.message;
    //const bardMessage = bardData.response;

    const pinterestResponse = await axios.get(`https://api-all-1.arjhilbard.repl.co/pinterest?search=${encodeURIComponent(question)}`);
    const pinterestImageUrls = pinterestResponse.data.data.slice(0, 6);

    const pinterestImageAttachments = [];

    for (let i = 0; i < pinterestImageUrls.length; i++) {
      const imageUrl = pinterestImageUrls[i];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
        const imagePath = path.join(
          global.cachePath,
          `${i + 1}_${Date.now()}_${message.messageID}.jpg`
        );
        fs.writeFileSync(imagePath, Buffer.from(imageResponse.data, "binary"));
        pinterestImageAttachments.push(fs.createReadStream(imagePath));
      } catch (error) {
        console.error("Error fetching Pinterest image:", error);
      }
    }

    const formattedBardAnswer = `📝 𝗭𝗛𝗨𝗚𝗘:  ${formatFont(bardMessage)}`;
    message.reply(formattedBardAnswer);

    const gttsPath = path.join(
      global.cachePath,
      `${Date.now()}_voice_${message.messageID}.mp3`
    );
    const gttsInstance = new gtts(bardMessage, 'en-us');
    gttsInstance.save(gttsPath, function (error, result) {
      if (error) {
        console.error("Error saving gTTS:", error);
      } else {

        message.reply({
          body: "🗣️ 𝗩𝗼𝗶𝗰𝗲 𝗔𝗻𝘀𝘄𝗲𝗿:",
          attachment: fs.createReadStream(gttsPath)
        });
      }
    });


    if (pinterestImageAttachments.length > 0) {
      message.reply(
        {
          attachment: pinterestImageAttachments,
          body: `📷 𝗜𝗺𝗮𝗴𝗲 𝗦𝗲𝗮𝗿𝗰𝗵 𝗥𝗲𝘀𝘂𝗹𝘁𝘀 𝗳𝗼𝗿: ${question}  `,
        }
      );
    }
  } catch (error) {
    console.error("An error occurred:", error);
    message.reply("❌ An error occurred while processing the request.");
  }
};

export default {
  config,
  onCall
}