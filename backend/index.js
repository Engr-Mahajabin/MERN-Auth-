import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { createClient } from "redis";

dotenv.config();
await connectDB();

// Connect to Redis:
const redisUrl = process.env.redis_URL;
if (!redisUrl) {
  console.log("Missing Redis URL");
  process.exit(1);
}
export const redisClient = createClient({
  url: redisUrl,
});

redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis successfully");
  })
  .catch(console.error);

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
