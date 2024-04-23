import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";

const uploadRoutes = express.Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/");
  },
  filename(req, file, callback) {
    const extname = path.extname(file.originalname);
    callback(null, `${file.filename}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = path.extname(file.originalname).toLocaleLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, "true");
  } else {
    cb(new Error("Images only"), "false");
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

uploadRoutes.route("/").post((req: Request, res: Response) => {
  uploadSingleImage(req, res, (error) => {
    if (error) {
      res.status(400).json({ message: error.message });
    } else if (req.file) {
      res.status(200).json({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`,
      });
    } else {
      res.status(400).json({ message: "No image file provided" });
    }
  });
});
export { uploadRoutes };
