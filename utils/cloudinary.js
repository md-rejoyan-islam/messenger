import { v2 as cloudinary } from "cloudinary";

// email :rejoyanislam0014@gmail.com
cloudinary.config({
  cloud_name: "dnatcmedm",
  api_key: "921419772846642",
  api_secret: "AfWOOWIX21lJRMssF6PLizB3uiM",
});

export const cloudUpload = async (path) => {
  // upload brand logo
  const data = await cloudinary.uploader.upload(path);
  return data.secure_url;
};

export const cloudDelete = async (publicId) => {
  // delete brand logo
  await cloudinary.uploader.destroy(publicId);
};

//export const cloudUpload = async (req) => {
// upload brand logo
//const data = await cloudinary.uploader.upload(req.file.path);
//return data;
//};
