import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB();
const app = express();

// Middleares:
app.use(express.json());

const PORT = process.env.PORT || 5000;

//importing routes:
import userRoutes from "./routes/user.js";

//using routes:
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
