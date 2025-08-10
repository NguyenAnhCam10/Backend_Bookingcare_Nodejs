import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import configViewEngine from "./config/viewEngine.js";
import initWebRoutes from "./routes/web.js";

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config view engine & routes
configViewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 6969;

app.listen(port, () => console.log(`🚀 Server đang chạy tại http://localhost:${port}`));
