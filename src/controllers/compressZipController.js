import fs from "fs";
import { join } from "path";
import archiver from "archiver";

export const compressZipController = async (req, res) => {
    const folderImagesPath = "src/public/filesCompressed"
  try {
    const output = fs.createWriteStream(
      "src/public/filesCompressed" + "/images.zip"
    );
    const archive = archiver("zip", { zlib: { level: 9 } });
    const folderContent = fs.readdirSync(folderImagesPath);
    for (let file of folderContent) {
        if (file.includes(".zip")){ 
          continue
        }
        else {
            archive.file(join(folderImagesPath,file),{name:file})
        }
    }
    archive.pipe(output)
    output.on("close",()=> {
        console.log("ya cerro")
    })
    archive.finalize()
    res.status(200).json({message:"zip ready"})
    
    
    console.log(folderContent)
    
  } catch (err) {
    res.status(500).send({message:"error interno"})
    console.log(err);
  }
};
