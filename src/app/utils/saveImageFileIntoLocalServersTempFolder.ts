import multer from "multer";
import InvalidImageFileUploadedError from "../errorHandlers/InvalidImageFileUploadedError";

const storage = multer.diskStorage({
  filename: (request, file, fileName) => {
    console.log(file.mimetype.substring(6));
    if (file.mimetype.includes("image/")) {
      console.log(`${Date.now().toString()}.${file.mimetype.substring(6)}`);
      fileName(null, `${Date.now().toString()}.${file.mimetype.substring(6)}`);
    } else {
      // fileName(null, `notAnImageFile.invalid`);
      throw new InvalidImageFileUploadedError();
    }
  },
});
// define a storage object for multer config thus file is stored in servers own temp folder.
// It works both for local machine and serverless function like Vercel
export const saveImageFileIntoLocalServersTempFolder = multer({ storage });
