import sharp from "sharp";
import fs from "fs/promises";
import { join } from "path";
import { cleanupEvent } from "../utilitys/events/cleanupFolder.js";

export const commpressController = async (req, res) => {
  try {
    cleanupEvent.emit("cleanupFolder");
    const { format, quality } = req.body;
    const files = req.files["files[]"];
    const outputFolder = "src/public/filesCompressed";

    if (files && Array.isArray(files)) {
      for (let file of files) {
        if (!file.mimetype.includes("image/")) {
          return res.status(415).json({ message: "unsuported type", status: 415 });
        }
      }
      const arrayUrls = [];
      for (let file of files) {
        const outputName = file.name.replace(/[^.]+$/, format);
        const outputPath = join(outputFolder, outputName);

        if (format === "jpeg") {
          await sharp(file.data, { failOnError: false })
            .jpeg({ quality: parseInt(quality) })
            .toFile(outputPath);
        } else {
          await sharp(file.data, { failOnError: false })
            .png({ quality: parseInt(quality) })
            .toFile(outputPath);
        }

        const stats = await fs.stat(outputPath);
        const fileSizeInKB = (stats.size / 1024).toFixed(2);
        arrayUrls.push({ name: outputName, size: `${fileSizeInKB} KB` });
      }
      return res.status(200).json(arrayUrls);
    } else if (files) {
      if (!files.mimetype.includes("image/")) {
        return res.status(415).json({ message: "unsuported type", status: 415 });
      }
      const outputName = files.name.replace(/[^.]+$/, format);
      const outputPath = join(outputFolder, outputName);

      if (format === "jpeg") {
        await sharp(files.data, { failOnError: false })
          .jpeg({ quality: parseInt(quality) })
          .toFile(outputPath);
      } else {
        await sharp(files.data, { failOnError: false })
          .png({ quality: parseInt(quality) })
          .toFile(outputPath);
      }

      const stats = await fs.stat(outputPath);
      const fileSizeInKB = (stats.size / 1024).toFixed(2);
      return res.status(200).json([{ name: outputName, size: `${fileSizeInKB} KB` }]);
    } else {
      res.status(206).send({ message: "sin archivos" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error en el servidor" });
  }
};
