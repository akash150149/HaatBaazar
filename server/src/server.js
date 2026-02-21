import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const port = Number(process.env.PORT || 5000);

async function bootstrap() {
  await connectDB(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
  });
}

bootstrap().catch((err) => {
  console.error("Server bootstrap failed", err);
  process.exit(1);
});
