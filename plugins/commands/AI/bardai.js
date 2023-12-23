import axios from "axios";

const config = {
  name: "bardai",
  version: "1.0",
  credits: "SiAM | @Siam.The.Fox (Converted by Grim)",
  cooldown: 5,
  description: "Generate AI response Bard\n support image reply",
  category: "AI",
  usage: "[prompt]' | [if you reply with an image then that image will be an attachment in bard question]"
};

async function onCall({ args, message }) {
  const { messageReply, type } = message;
  const prompt = args.join(" ");
  if (!prompt) {
    message.reply(`Please provide a prompt. Usage: ${prefix}${config.name} [prompt]`);
    return;
  }
  const cookie = 'dAgEalWpmFhsiZWAaQ4x1-Zrh4dmhNmJ53V7wwj66DG9go9iqOwea9xpATpF6jHUXTSCPA.'; //if you don't know know how to get cookie from cookies editor then just don't add the cookie parameter with api params ( it will use my default cookie ) . but i recommend  add your own cookies for less error. 

  const key = 'SiAM_QSJFD'; // Add your  API key here ( get it from SiAM)

  let params = {
    prompt: encodeURIComponent(prompt),
    cookie: cookie,//if you add cookies don't encode the cookie. Exact same as cookies editor " __Secure-1PSID " value .
    apiKey: key,
    attImage: "",
  };

  if (type === "message_reply" && messageReply.attachments && messageReply.attachments.length > 0 && ["photo", "sticker"].includes(messageReply.attachments[0].type)) {
    params.attImage = encodeURIComponent(messageReply.attachments[0].url); // Encode artImage ( its needed or Facebook link will gib error )
  }

  try {
    message.react("⏳");
    const response = await axios.get("https://api.siambardproject.repl.co/getBard", { params: params });
    const result = response.data;

    let content = result.answer;
    let attachment = [];

    if (result.attachment && result.attachment.length > 0) {
      const noSpam = result.attachment.slice(0, 6); // it will prevent spam , now matter how many images users ask this will send only first 6 image. 

      for (let url of noSpam) {
        try {
          const stream = await getStream(url);
          if (stream) {
            attachment.push(stream);
          }
        } catch (error) {
          console.error(`error: ${url}`);
        }
      }
    }

    await message.react("☑️");
    await message.reply({
      body: content,
      attachment: attachment,
    });
  } catch (error) {
    console.error("Error:", error);
    message.reply("Error!");
  }
};

export default {
  config,
  onCall
}
