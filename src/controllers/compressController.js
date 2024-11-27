import sharp from "sharp";
import fs from "fs/promises";
import { join } from "path";
import { cleanupEvent } from "../utilitys/events/cleanupFolder.js";

export const commpressController = async (req, res) => {
  try {
    cleanupEvent.emit("cleanupFolder")
    const { format, quality } = req.body;
    const files = req.files["files[]"];
    const outputFolder = "src/public/filesCompressed";

    if (files && Array.isArray(files)) {
      for (let file of files) {
        if (!file.mimetype.includes("image/")) {
          return res.status(415).json({message:"unsuported type",status:415})
        }
      }
      const arrayUrls = [];
      for (let file of files) {
        console.log(file)
        const outputName = file.name.replace(/[^.]+$/, format)
        if (format == "jpeg") {
          let image = await sharp(file.data,{ failOnError: false })
            .jpeg({ quality: parseInt(quality) })
            .toFile(join(outputFolder,outputName));
            arrayUrls.push(outputName)
        } else {
          let image = await sharp(file.data,{ failOnError: false })
            .png({ quality: parseInt(quality) })
            .toFile(join(outputFolder,outputName));
            arrayUrls.push(outputName)
        }
      }
      return res.status(200).json(arrayUrls);
    }
    else if (files) {
      if (!files.mimetype.includes("image/")) {
        return res.status(415).json({message:"unsuported type",status:415})
      }
      const outputName = files.name.replace(/[^.]+$/, format)
      if (format == "jpeg") {
        let image = await sharp(files.data,{ failOnError: false })
          .jpeg({ quality: parseInt(quality) })
          .toFile(join(outputFolder,outputName));
      } else {
        let image = await sharp(files.data,{ failOnError: false })
          .png({ quality: parseInt(quality) })
          .toFile(join(outputFolder,outputName));
      }
      return res.status(200).json([outputName]);
    }
    else {
      res.status(206).send({message:"sin archivos"})
    }
   
  } catch (err) {
    console.log(err);
  }
};
