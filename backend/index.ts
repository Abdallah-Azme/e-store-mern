import express from "express";
import { connectToDB } from "./config/db";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route";
import { error } from "./middlewares/error";
import { notFound } from "./middlewares/notFound";
import { serializeUser } from "./middlewares/serialize.user";
config();

const app = express();

//packages
app.use(express.json());
app.use(cookieParser());

//middlewares
app.use(serializeUser);

app.use("/api/users", userRoutes);

app.use("*", notFound);
app.use("*", error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.info("start server", PORT);
  await connectToDB();
});
