import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";

dotenv.config();
// is the line that actually activates dotenv and loads your .env file.
const app = express();

// default middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);

// "http://localhost:8000//api/v1/user/register"
connectDB(); 

app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});

// runs the code inside your db.js file, which does this:
// opens a connection betweeen your Express server and your MongoDB Atlas database.Without it , your app has no database connection

