import axios from 'axios';

export const config = {
  name: "hercai",
  version: "1.0",
  author: "Xyron Chen",
  cooldown: 5,
  description: "Get response from Hercai."
};

export async function onCall({ message, args }) {
  const prompt = args.join(' ');
  try {
    const baduy = await message.reply(`🤔 | Hercai is thinking...`);

    const response = await axios.get(`https://hercai.miraixyxy.repl.co/hercaiapi?prompt=${encodeURIComponent(prompt)}`);

    if (response.data && response.data.reply) {
      const answer = response.data.reply;
      const sagot = `${answer}`;
      message.reply({ body: sagot })
        .then((d) => {
          d.addReplyEvent({
            callback: handleReply
          });
          global.api.unsendMessage(baduy.messageID);
        });
    }

  } catch (error) {
    console.error("Error:", error.message);
  }
};

async function handleReply({ message, eventData }) {
  const { author } = eventData;
  const text = message.body;

  try {
    const boring = await message.send(`🤔 | Hercai is thinking...`);
    const response = await axios.get(`https://hercai.miraixyxy.repl.co/hercaiapi?prompt=${encodeURIComponent(text)}`);
    if (response.data && response.data.reply) {
      const answer = response.data.reply;
      const sagot2 = `${answer}`;
      message.reply({ body: sagot2 })
        .then((d) => {
          d.addReplyEvent({
            callback: handleReply,
            author: author
          });
          global.api.unsendMessage(boring.messageID);
        });
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

