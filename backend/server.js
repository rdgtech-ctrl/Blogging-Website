import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);

connectDB();

app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});
// runs the code inside your db.js file, which does this:
// opens a connection betweeen your Express server and your MongoDB Atlas database.Without it , your app has no database connection

