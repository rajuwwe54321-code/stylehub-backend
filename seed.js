import mongoose from "mongoose";

/* CONNECT DATABASE */
mongoose
  .connect("mongodb://127.0.0.1:27017/stylehub")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* PRODUCT MODEL */
const Product = mongoose.model("Product", {
  name: String,
  price: Number,
  image: String,
});

/* PRODUCTS DATA */
const products = [
  {
    name: "Classic White Shirt",
    price: 999,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
  },
  {
    name: "Denim Jacket",
    price: 2499,
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
  },
  {
    name: "Summer Floral Dress",
    price: 1799,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  },
  {
    name: "Casual Hoodie",
    price: 1499,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    name: "Formal Blazer",
    price: 3299,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    name: "Slim Fit Jeans",
    price: 1999,
    image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb",
  },
];

/* INSERT PRODUCTS */
const seedProducts = async () => {
  await Product.deleteMany();

  await Product.insertMany(products);

  console.log("Products inserted successfully");

  process.exit();
};

seedProducts();
