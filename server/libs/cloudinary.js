import { v2 as cloudinary } from "cloudinary";

const cloud = cloudinary.config({
   cloud_name: "totoroowo",
   api_key: "982725589445646",
   api_secret: "xyFdWz0NVMtLj9uc9NHpNj2mX38",
});

export const UploadImage = async (filepath) => {
   return await cloudinary.uploader.upload(filepath, {
      folder: "posts",
   });
};
export const DeleteImage = async (public_id) => {
   return await cloudinary.uploader.destroy(public_id);
}
