import axios from 'axios';

export const config = {
    name: "cari",
    version: "1.1",
    credits: "August Quinn",
    description: "Interact with CARI (Conversational Artificial Intelligence)",
    usage: "[prompt] = [response]",
    cooldown: 3,
};

export async function onCall({ message, args }) {
    const prompt = args.join(" ");

    if (!prompt) {
        message.reply("How can I assist you today?");
        return;
    }

    try {
        const userName = await getUserName(api, senderID);
        const cariAPI = "https://cari.august-quinn-api.repl.co/response";
        const response = await axios.post(cariAPI, { userID: senderID, userName, prompt });
        const reply = response.data.reply;

        message.reply(reply);
    } catch (error) {
        console.error("Error:", error);
        message.reply("⛔ | High traffic: Please try again later again.");
    }
};

async function getUserName(userID) {
    try {
        const name = await global.api.getUserInfo(userID);
        return name[userID].firstName;
    } catch (error) {
        console.error("Error getting user name:", error);
        return "Friend";
    }
}