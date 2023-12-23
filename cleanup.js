import { readdirSync, statSync, unlinkSync, rmSync } from "fs";

try {
  [
    "./plugins/commands/cache/",
    "./core/var/data/cache/",
    "./plugins/commands/MEDIA/cache/",
    "./plugins/commands/AI/cache/",
    "./plugins/commands/GENERAL/cache/",
    "./plugins/commands/ENTERTAINMENT/cache/",
  ]
    .forEach(path => {
      const files = readdirSync(path);
      files.forEach(file => {
        const filePath = `${path}${file}`;
        if (statSync(filePath).isFile() && file != "README.txt") {
          unlinkSync(filePath);
        }
      });
    });
} catch (e) {
  console.error(e);
}
