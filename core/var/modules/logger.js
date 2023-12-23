import chalk from 'chalk';
import gradient from 'gradient-string';
import fs from "fs";
import path from "path";

const configPath = path.join(process.cwd(), "config", "config.plugins.json");
const con = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const theme = con.DESIGN.Theme;

let co;
let error;
if (theme.toLowerCase() === 'blue') {
  co = gradient("#243aff", "#4687f0", "#5800d4");
  error = chalk.red.bold;
} else if (theme.toLowerCase() === 'fiery') {
  co = gradient("#fc2803", "#fc6f03", "#fcba03");
  error = chalk.red.bold;
} else if (theme.toLowerCase() === 'red') {
  co = gradient("red", "orange");
  error = chalk.red.bold;
} else if (theme.toLowerCase() === 'aqua') {
  co = gradient("#0030ff", "#4e6cf2");
  error = chalk.blueBright;
} else if (theme.toLowerCase() === 'pink') {
  cra = gradient('purple', 'pink');
  co = gradient("#d94fff", "purple");
} else if (theme.toLowerCase() === 'retro') {
  cra = gradient("#d94fff", "purple");
  co = gradient.retro;
} else if (theme.toLowerCase() === 'sunlight') {
  cra = gradient("#f5bd31", "#f5e131");
  co = gradient("orange", "#ffff00", "#ffe600");
} else if (theme.toLowerCase() === 'teen') {
  cra = gradient("#00a9c7", "#853858");
  co = gradient.teen;
} else if (theme.toLowerCase() === 'summer') {
  cra = gradient("#fcff4d", "#4de1ff");
  co = gradient.summer;
} else if (theme.toLowerCase() === 'flower') {
  cra = gradient("blue", "purple", "yellow", "#81ff6e");
  co = gradient.pastel;
} else if (theme.toLowerCase() === 'ghost') {
  cra = gradient("#0a658a", "#0a7f8a", "#0db5aa");
  co = gradient.mind;
} else if (theme === 'hacker') {
  cra = chalk.hex('#4be813');
  co = gradient('#47a127', '#0eed19', '#27f231');
} else {
  co = gradient("#243aff", "#4687f0", "#5800d4");
  error = chalk.red.bold;
}

const logger = {
    info: (message) => {
        //Green for the tag, reset for the message
        console.log(`\x1b[32m[INFO]\x1b[0m ${message}`);
    },
    warn: (message) => {
        //Yellow for the tag, reset for the message
        console.log(`\x1b[33m[ WARN ]\x1b[0m ${message}`);
    },
    error: (message) => {
        //Red for the tag, reset for the message
        console.log(`\x1b[31m[ ERROR ]\x1b[0m ${message}`);
    },
    system: (message) => {
        //Blue for the tag, reset for the message
        console.log(`\x1b[34m[ SYSTEM ]\x1b[0m ${message}`);
    },
    custom: (message, type ) => {
        //Cyan color by default for the tag, reset for the message
        console.log(co(`[ ${type} ]\x1b`) + " " + `${message}`);
    },
};

export default logger;
