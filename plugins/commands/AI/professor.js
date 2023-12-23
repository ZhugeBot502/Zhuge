import axios from 'axios';

export default {
  config: {
    name: 'professor',
    version: '3.0',
    author: 'Api by JV Barcenas', // do not change
    credits: 'Api by JV Barcenas', // do not change
    description: 'Professor Ai, willing to teach you as he can.',
    usage: '[prompt]',
  },
  onCall: async function({ message }) {

    try {
      const prompt = message.body.trim();

      if (prompt) {
        const loadingMessage = await message.reply("💭 | Professor AI is thinking, please wait a moment...");


        const response = await axios.get(`https://gptproffessor.miraixyxy.repl.co/professor?prompt=${encodeURIComponent(prompt)}`);

        if (response.data) {
          const messageText = `🧑‍🏫 | Professor: ${response.data.content}`;
          await message.reply(messageText);

          console.log('Sent answer as a reply to the user');
        } else {
          throw new Error('Invalid or missing response from API');
        }
        global.api.unsendMessage(loadingMessage.messageID);
      }

    } catch (error) {
      console.error(`Failed to get an answer: ${error.content}`);
      message.reply(
        `${error.content}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`
      );
    }
  }
};