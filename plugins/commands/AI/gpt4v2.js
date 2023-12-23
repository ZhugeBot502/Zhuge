import axios from 'axios';

const config = {
  name: "gpt4v2",
  aliases: [""],
  version: "1.0",
  credits: "SiAM",
  description: "ChatGPT with GPT 4 like model. (NOTE: This is not the original gpt4 but its inspired from gpt4 model structure)",
  usage: "[query]"
};

async function onCall({ message, args }) {
  const userID = message.senderID;
  const query = encodeURIComponent(args.join(" "));

  if (!query) {
    message.reply("Please provide a query. \n\nExample: /gpt How does photosynthesis work?");
    return;
  }

  try {
    message.react("⏳");
    const response = await axios.get(`https://gpt4.siam-apiproject.repl.co/api?uid=${userID}&query=${query}`);

    const answer = response.data.lastAnswer;

    if (answer) {
      message.reply({
        body: answer,
        attachment: ''
      })
        .then((d) => {
          d.addReplyEvent({
            callback: handleReply
          });
          message.react("☑️");
        });
    } else {
      console.error("Invalid API Response:", response.data);
      sendErrorMessage(message, "Server response is invalid ❌");
    }
  } catch (error) {
    console.error("Request Error:", error);
    sendErrorMessage(message, "Server not responding ❌");
  }
};

async function handleReply({ message, eventData }) {
  let { author } = eventData;
  if (message.senderID !== author) return;
  const userID = author;
  const query = message.body;

  if (query.toLowerCase() === "clear") {
    global.handleReply.delete(message.messageID);
    message.reply("Previous conversation has been cleared.");
    return;
  }

  try {
    message.react("⏳");
    const response = await axios.get(`https://gpt4.siam-apiproject.repl.co/api?uid=${userID}&query=${query}`);

    const answer = response.data.lastAnswer;

    if (answer) {
      message.reply({
          body: answer,
          attachment: ''
        }
      )
      .then((d) => {
        d.addReplyEvent({
          callback: handleReply,
          author: userID
        });
        message.react("☑️");
      });
    } else {
      console.error("Invalid API Response:", response.data);
      sendErrorMessage(message, "Server response is invalid ❌");
    }
  } catch (error) {
    console.error("Request Error:", error);
    sendErrorMessage(message, "Server not responding ❌");
  }
};


function sendErrorMessage(message, errorMessage) {
  message.reply({ body: errorMessage });
}

export default {
  config,
  onCall
}
