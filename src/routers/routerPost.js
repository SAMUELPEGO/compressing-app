import express from "express"
import { commpressController } from "../controllers/compressController.js"

export const routerPost = express.Router();

routerPost.post("/compress",commpressController)