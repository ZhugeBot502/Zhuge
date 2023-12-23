import axios from 'axios';

export const config = {
  name: "echo",
  version: "2.1.0",
  credits: "August Quinn",
  description: "Echo (Engaging Chatbot with Helpful Output) created by August Quinn. Character AI version 2.",
  usages: "[prompt]",
  cooldown: 5,
};

export async function onCall({ message, args }) {
  const { senderID } = message;
  const prompt = args.join(" ");

  if (!prompt) {
    message.reply("What's up?");
    return;
  }

  try {
    const userName = await getUserName(api, senderID);
    const characterAI = "https://echo.august-quinn-api.repl.co/prompt";
    const response = await axios.post(characterAI, { prompt, userName, uid: senderID });

    if (response.data && response.data.openai && response.data.openai.generated_text) {
      const generatedText = response.data.openai.generated_text;
      message.reply(generatedText);
    } else {
      message.reply("Error processing the prompt. Please try again later.");
    }
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    message.reply("Error processing the prompt. Please try again later.");
  }
};

async function getUserName(api, userID) {
  try {
    const name = await global.api.getUserInfo(userID);
    return name[userID]?.firstName || "Friend";
  } catch (error) {
    console.error("Error getting user name:", error);
    return "Friend";
  }
};