import axios from 'axios';

const config = {
  name: "box",
  aliases: ["boxai"],
  version: "1.0",
  author: "Loid Butter", // Api By Hazeyy
  credits: "Grim",
  cooldown: 5,
  description: "BlackBox Ai Ask Anything",
};

async function onCall({ message, args }) {
  const { threadID, messageID } = message;

  if (!args[0]) {
    message.reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗆𝖾 𝖺 (𝖰𝗎𝖾𝗋𝗒) 𝗍𝗈 𝗌𝖾𝖺𝗋𝖼𝗁 𝗈𝗇 𝖯𝗁𝗒𝗍𝗈𝗇 𝖠𝖨");
    return;
  }

  const query = args.join(" ");

  try {
    message.react("⏳");
    const response = await axios.get(`https://hazeyy-api-blackbox.kyrinwu.repl.co/ask?q=My%20request%20is%20${encodeURIComponent(query)}`);

    if (response.status === 200 && response.data && response.data.message) {
      const answer = response.data.message;
      const formattedAnswer = formatFont(answer); // Apply font formatting
      message.react("✅");
      global.api.sendMessage(formattedAnswer, threadID, messageID);
    } else {
      message.reply("𝖲𝗈𝗋𝗋𝗒, 𝗇𝗈 𝗋𝖾𝗅𝖾𝗏𝖺𝗇𝗍 𝖺𝗇𝗌𝗐𝖾𝗋𝗌 𝖿𝗈𝗎𝗇𝖽.");
    }
  } catch (error) {
    console.error(error);
    message.reply("𝖴𝗇𝖾𝗑𝗉𝖾𝖼𝗍𝖾𝖽 𝖾𝗋𝗋𝗈𝗋 𝗐𝗁𝗂𝗅𝖾 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖺𝗇𝗌𝗐𝖾𝗋 𝗈𝗇 𝖯𝗁𝗒𝗍𝗈𝗇 𝖠𝖨.");
    return;
  }
}

function formatFont(text) {
  const fontMapping = {
    a: "𝖺",
    b: "𝖻",
    c: "𝖼",
    d: "𝖽",
    e: "𝖾",
    f: "𝖿",
    g: "𝗀",
    h: "𝗁",
    i: "𝗂",
    j: "𝗃",
    k: "𝗄",
    l: "𝗅",
    m: "𝗆",
    n: "𝗇",
    o: "𝗈",
    p: "𝗉",
    q: "𝗊",
    r: "𝗋",
    s: "𝗌",
    t: "𝗍",
    u: "𝗎",
    v: "𝗏",
    w: "𝗐",
    x: "𝗑",
    y: "𝗒",
    z: "𝗓",
    A: "𝖠",
    B: "𝖡",
    C: "𝖢",
    D: "𝖣",
    E: "𝖤",
    F: "𝖥",
    G: "𝖦",
    H: "𝖧",
    I: "𝖨",
    J: "𝖩",
    K: "𝖪",
    L: "𝖫",
    M: "𝖬",
    N: "𝖭",
    O: "𝖮",
    P: "𝖯",
    Q: "𝖰",
    R: "𝖱",
    S: "𝖲",
    T: "𝖳",
    U: "𝖴",
    V: "𝖵",
    W: "𝖶",
    X: "𝖷",
    Y: "𝖸",
    Z: "𝖹"
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
