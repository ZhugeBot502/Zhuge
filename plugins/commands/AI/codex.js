import axios from 'axios';

export const config = {
  name: "codex",
  version: "1.0.0",
  credits: "August Quinn (Converted by Grim)",
  description: "Generate code using Google.",
  usage: "[instruction]",
  cooldown: 5,
};

export async function onCall({ message, args }) {
  const instruction = args.join(' ');

  if (!instruction) {
    message.replt("Please provide instructions to generate code.");
    return;
  }

  try {
    const response = await axios.post('http://codex.august-quinn-api.repl.co/code-generation', { instruction });
    const result = response.data;

    if (result.google && result.google.status === "success") {
      message.reply(`⚙️ 𝗖𝗢𝗗𝗘𝗫'𝗦 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘\n\n\`\`\`${result.google.generated_text}\`\`\``);
    } else {
      message.reply("An error occurred while generating code.");
    }
  } catch (error) {
    console.error('[ERROR]', error);
    message.reply("An error occurred while generating code.");
  }
};