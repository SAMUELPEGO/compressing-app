import express from "express"
import { compressZipController } from "../controllers/compressZipController.js";

export const routerGet = express.Router();

routerGet.get("/",(req,res)=>{ 
    res.render("index.njk")
})

routerGet.get("/getAllCompressed",compressZipController)

routerGet.get("/images.zip",(req,res)=> {
    const path = "src/public/filesCompressed";
    res.download(path + "/images.zip")
})