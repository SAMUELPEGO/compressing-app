import { EventEmitter } from "events";
import fs from "fs/promises";
import { join } from "path";

const customEmitter = new EventEmitter();

export const cleanupEvent = customEmitter.on("cleanupFolder", async () => {
  const folderPath = "src/public/filesCompressed";
  const folderContent = await fs.readdir(folderPath);
  folderContent.forEach(async (file) => {
    console.log(file);
    await fs.unlink(join(folderPath, file));
  });
});
