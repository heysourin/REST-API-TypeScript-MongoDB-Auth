import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

require("dotenv").config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", router());

const server = http.createServer(app);

const mongoUrl = process.env.MONGO_URL;
mongoose.Promise = Promise;
if (!mongoUrl) {
  throw new Error("Please set the MONGO_URL environment variable");
}
mongoose.connect(mongoUrl);
mongoose.connection.on("error", (err: Error) => console.log(err));

server.listen(8001, () => {
  console.log(`Server running on 8001`);
});
