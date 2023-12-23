import axios from "axios";

export default function ({ message, args }) {
  const input = message.body;

  if (input && (input.trim().toLowerCase().startsWith('gpt ') || input.trim().toLowerCase().startsWith('ai '))) {
    const data = input.split(" ");
    data.shift();
    const prompt = data.join(" ");

    if (!prompt) {
      return message.reply(`❗| Kindly provide a question or query! Please try again...`);
    }
    axios.get('https://chatgayfeyti.archashura.repl.co/?gpt=' + encodeURIComponent(prompt))
      .then(response => {
        message.reply(response.data.content);
      })
      .catch(error => {
        console.error(error);
        message.reply('Error occurred.');
      });
  }
}