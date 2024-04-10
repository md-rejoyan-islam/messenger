import multer from "multer";

// multer storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + Math.round(Math.random() * 1000000) + "-" + file.fieldname
    );
  },
});

// multer for brand logo
export const userPhotoUpload = multer({ storage }).single("photo");

// chat photo
export const chatPhotoUpload = multer({ storage }).single("photo");
