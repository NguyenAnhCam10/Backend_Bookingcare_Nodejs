import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import configViewEngine from "./config/viewEngine.js";
import initWebRoutes from "./routes/web.js";
import connectDB from "./config/connectDB.js"
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:3000",  // chỉ cho phép React ở cổng 3000
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Config view engine & routes
configViewEngine(app);
initWebRoutes(app);
connectDB();
let port = process.env.PORT || 6969;

app.listen(port, () => console.log(`🚀 Server đang chạy tại http://localhost:${port}`));
