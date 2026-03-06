import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import User from "./User.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://clothstorebhiwadi.netlify.app/"],
  }),
);

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://rajuwwe54321:Romanreings@1@cluster0.uhtw7pm.mongodb.net/?appName=Cluster0",
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* PRODUCT MODEL */
const Product = mongoose.model("Product", {
  name: String,
  price: Number,
  image: String,
});

/* ================= USER ROUTES ================= */

/* SIGNUP */
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  res.json({ message: "Signup successful" });
});

/* LOGIN */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.json({ message: "Wrong password" });
  }

  const isAdmin = email === "rajuwwe54321@gmail.com";

  res.json({
    message: "Login success",
    user: {
      name: user.name,
      email: user.email,
      isAdmin: isAdmin,
    },
  });
});

/* ================= PRODUCT ROUTES ================= */

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const { name, price, image } = req.body;

  const product = new Product({
    name,
    price,
    image,
  });

  await product.save();

  res.json(product);
});

app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

/* SERVER START */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
