import axios from "axios";

export const config = {
  name: "gemini",
  version: "1.0",
  credits: "Samir OE",
  cooldown: 5,
  description: "Talk to Gemini AI",
  category: "google"
};

export async function onCall({ message, args }) {
  const text = args.join(' ');

  try {
    const response = await axios.get(`https://bnw.samirzyx.repl.co/api/Gemini?text=${encodeURIComponent(text)}`);

    if (response.data && response.data.candidates && response.data.candidates.length > 0) {
      const textContent = response.data.candidates[0].content.parts[0].text;
      const ans = `${textContent}`;
      message.reply({
        body: ans
      })
        .then((d) => {
          d.addReplyEvent({
            callback: handleReply
          });
        });
    }

  } catch (error) {
    console.error("Error:", error.message);
  }
};

async function handleReply({ message, eventData, args }) {
  let { author } = eventData;
  if (message.senderID != author) return;
  const gif = message.body;

  try {
    const response = await axios.get(`https://bnw.samirzyx.repl.co/api/Gemini?text=${encodeURIComponent(gif)}`);

    if (response.data && response.data.candidates && response.data.candidates.length > 0) {
      const textContent = response.data.candidates[0].content.parts[0].text;
      const wh = `${textContent}`;
      message.reply({
        body: wh,
      })
        .then((d) => {
          d.addReplyEvent({
            callback: handleReply
          });
        });
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};