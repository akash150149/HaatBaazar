import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import Product from "./models/Product.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedProducts() {
  await connectDB(process.env.MONGODB_URI);

  const sourcePath = path.resolve(__dirname, "../../src/data/products.json");
  const raw = await fs.readFile(sourcePath, "utf8");
  const products = JSON.parse(raw);

  await Product.deleteMany({});

  const docs = products.map((item) => ({
    title: item.title,
    description: item.description,
    price: item.price,
    category: item.category,
    images: item.images,
    stock: item.stock,
    rating: item.rating,
    createdAt: item.createdAt,
    updatedAt: item.createdAt
  }));

  await Product.insertMany(docs);
  console.log(`Seeded ${docs.length} products`);
  process.exit(0);
}

seedProducts().catch((err) => {
  console.error("Seed failed", err);
  process.exit(1);
});
