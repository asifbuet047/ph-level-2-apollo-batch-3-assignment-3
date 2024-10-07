import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../config/config";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImageFileToCloudinaryHostingServer = (
  fileName: string,
  filePath: string
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        public_id: fileName,
        transformation: [{ width: 1024, height: 1024, fetch_format: "jpg" }],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
          fs.unlink(filePath, (error) => {
            if (error) {
              console.log(error);
            } else {
              console.log("File deleted");
            }
          });
        }
      }
    );
  });
};
