import "dotenv/config";
import dns from "node:dns";
import { connectDB } from "./config/db.js";

// WSL/IPv6 environments can cause intermittent ETIMEDOUT for some SDK calls.
dns.setDefaultResultOrder("ipv4first");

const port = Number(process.env.PORT || 5000);

async function bootstrap() {
  const { default: app } = await import("./app.js");
  await connectDB(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
  });
}

bootstrap().catch((err) => {
  console.error("Server bootstrap failed", err);
  process.exit(1);
});
