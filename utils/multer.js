// const multer = require("multer");
// const createError = require("http-errors");
// const path = require("path");
import createError from "http-errors";
import multer from "multer";
import path from "path";

// create disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
    // image file size
    const fileSize = parseInt(req.headers["content-length"]);

    // user photo
    if (file.fieldname == "user_photo") {
      if (fileSize > 400000) {
        return cb(createError(400, "Maximum image size is 400KB"));
      }
      // image location
      cb(null, path.resolve("./public/images/users"));
    }
  },
  filename: (req, file, cb) => {
    // program photo
    if (file.fieldname == "user_photo") {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, "_"));
    }
  },
});

const fileFilter = (req, file, cb) => {
  // image extension fixed
  const supportedImageExtension = /(png|jpg|jpeg|webp|svg)/;
  const fileExtension = path.extname(file.originalname);
  if (supportedImageExtension.test(fileExtension)) {
    cb(null, true);
  } else {
    cb(createError("Only PNG/JPG/JPEG/WEBP image accepted"), false);
  }
};

// user
const userMulter = multer({
  storage: storage,
  fileFilter,
}).single("user_photo");
