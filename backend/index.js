// console.log("Hello World!!!");
// Packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
// Utiles
import connectDB from "./config/db.js";

dotenv.config();
const port = 5000;
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/product",productRoutes);
app.use("/api/upload",uploadRoutes);

const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname + '/uploads')));
app.listen(port, () => console.log(`Server running on port ${port}`));

