import axios from 'axios';

const config = {
    name: "help",
    aliases: ["cmds", "commands"],
    version: "4.4.4",
    description: "Show all commands or command details",
    usage: "[command] (optional)",
    credits: "WaifuCat"
}

const langData = {
    "en_US": {
        "help.list": "{list}\n\n📜 Total: {total} commands\n🔍 Use {syntax} [command] to learn more about a command.",
        "help.commandNotExists": "Command '{command}' does not exist.",
        "help.commandDetails": `
            📌 Name: {name}
            🔗 Aliases: {aliases}
            🛠 Version: {version}
            📝 Description: {description}
            🔍 Usage: {usage}
            👑 Permissions: {permissions}
            🔖 Category: {category}
            ⏱ Cooldown: {cooldown}
            ✍ Credits: {credits}
        `,
        "0": "Member",
        "1": "Group Admin",
        "2": "Bot Admin"
    },
    "vi_VN": {
        "help.list": "{list}\n\n📜 Bot có tổng cộng: {total} lệnh\n🔍 Sử dụng {syntax} [lệnh] để tìm hiểu thêm về một lệnh.",
        "help.commandNotExists": "Lệnh '{command}' không tồn tại.",
        "help.commandDetails": `
            📌 Tên: {name}
            🔗 Tên gọi khác: {aliases}
            🛠 Phiên bản: {version}
            📝 Mô tả: {description}
            🔍 Cách sử dụng: {usage}
            👑 Quyền hạn: {permissions}
            🔖 Thể loại: {category}
            ⏱ Thời gian chờ: {cooldown}
            ✍ Người viết: {credits}
        `,
        "0": "Thành viên",
        "1": "Quản trị nhóm",
        "2": "Quản trị bot"
    }
};

function getCommandName(commandName) {
    if (global.plugins.commandsAliases.has(commandName)) return commandName;

    for (let [key, value] of global.plugins.commandsAliases) {
        if (value.includes(commandName)) return key;
    }

    return null
}

async function onCall({ message, args, getLang, userPermissions, prefix }) {
    const { commandsConfig } = global.plugins;
    const commandName = args[0]?.toLowerCase();
    const image = (await axios.get("https://i.imgur.com/F6JLseL.gif", {
      responseType: "stream"
    })).data;

    if (!commandName) {
        let commands = {};
        const language = data?.thread?.data?.language || global.config.LANGUAGE || 'en_US';
        for (const [key, value] of commandsConfig.entries()) {
            if (!!value.isHidden) continue;
            if (!!value.isAbsolute ? !global.config?.ABSOLUTES.some(e => e == message.senderID) : false) continue;
            if (!value.hasOwnProperty("permissions")) value.permissions = [0, 1, 2];
            if (!value.permissions.some(p => userPermissions.includes(p))) continue;
            if (!commands.hasOwnProperty(value.category)) commands[value.category] = [];
            commands[value.category].push(value._name && value._name[language] ? value._name[language] : key);
        }

        let list = Object.keys(commands)
            .map(category => `⌈ ${category} ⌋\n${commands[category].join(", ")}`)
            .join("\n\n");

        message.reply({
          body: getLang("help.list", {
            total: Object.values(commands).map(e => e.length).reduce((a, b) => a + b, 0),
            list,
            syntax: message.args[0].toLowerCase()
        }),
          //attachment: image
          });
    } else {
        const command = commandsConfig.get(getCommandName(commandName, commandsConfig));
        if (!command) return message.reply(getLang("help.commandNotExists", { command: commandName }));

        const isHidden = !!command.isHidden;
        const isUserValid = !!command.isAbsolute ? global.config?.ABSOLUTES.some(e => e == message.senderID) : true;
        const isPermissionValid = command.permissions.some(p => userPermissions.includes(p));
        if (isHidden || !isUserValid || !isPermissionValid)
            return message.reply(getLang("help.commandNotExists", { command: commandName }));

        message.reply(getLang("help.commandDetails", {
            name: command.name,
            aliases: command.aliases.join(", "),
            version: command.version || "4.4.4",
            description: command.description || '',
            usage: `${prefix}${commandName} ${command.usage || ''}`,
            permissions: command.permissions.map(p => getLang(String(p))).join(", "),
            category: command.category,
            cooldown: command.cooldown || 3,
            credits: command.credits || ""
        }).replace(/^ +/gm, ''));
    }
}

export default {
    config,
    langData,
    onCall
}