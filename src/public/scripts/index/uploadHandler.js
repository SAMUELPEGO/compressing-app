import { handleDragEnter, handleDragOver, handleDrop } from "./handleDrop.js";
import { handleInputFile } from "./handleInputFile.js";
import { zipUpload } from "./handleZipUpload.js";

const dropArea = document.querySelector(".drop-container");
dropArea.addEventListener("dragenter", handleDragEnter);
dropArea.addEventListener("dragover", handleDragOver);
dropArea.addEventListener("drop", handleDrop);
document
  .getElementById("inputFile")
  .addEventListener("change", handleInputFile);

const btnUpload = document
  .querySelector(".btn-upload")
  .addEventListener("click", zipUpload);
