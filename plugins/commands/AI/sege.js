import segeaiv2 from 'segeaiv2';

const config = {
  name: 'sege',
  version: '1.0',
  credits: 'Samir Œ',
  cooldown: 5,
  description: 'Sarcasm',
  usage: "[prompt]"
};

async function onCall({ message, args }) {
  if (args.length < 1) {
    return message.reply('Please provide a question.');
  }

  const question = args.join(' ');

  message.react("⏳");

  segeaiv2(question, (error, response) => {
    if (error) {
      console.error('Error while making the Segeaiv2 API request:', error);
      message.reply('An error occurred while processing your question.');
      message.react("❌");
    } else {
      const reply = response;

      message.reply(reply)
        .then((d) => {
          d.addReplyEvent({
            callback: handleReply
          });
          message.react("☑️");
        });
    }
  });
}

async function handleReply({ message, eventData }) {
  const { author } = eventData;
  const question = message.body;
  
  if (question.length == 0) return;
  
  await message.react("⏳");

  segeaiv2(question, (error, response) => {
    if (error) {
      console.error('Error while making the Segeaiv2 API request:', error);
      message.reply('An error occurred while processing your question.');
      message.react("❌");
    } else {
      const reply = response;

      message.reply(reply)
        .then((d) => {
          d.addReplyEvent({
            callback: handleReply,
            author: author
          });
          message.react("☑️");
        });
    }
  });
}

export default {
  config,
  onCall
};
