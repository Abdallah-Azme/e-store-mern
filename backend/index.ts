import express from "express";
import { connectToDB } from "./config/db";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route";
import { error } from "./middlewares/error";
import { notFound } from "./middlewares/notFound";
import { serializeUser } from "./middlewares/serialize.user";
import { categoryRoutes } from "./routes/category.route";
import { productRoutes } from "./routes/product.route";
import { uploadRoutes } from "./routes/upload.route";
import path from "path";
config();

const app = express();

//packages
app.use(express.json());
app.use(cookieParser());

//middlewares
app.use(serializeUser);

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.use("*", notFound);
app.use("*", error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.info("start server", PORT);
  await connectToDB();
});
