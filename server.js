
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const dns = require("dns");
const path = require("path");// Images
dns.setServers(["8.8.8.8", "8.8.4.4"]);


// 1.Routes
const productRoutes = require("./routes/productRoute");
const adminRoutes   = require("./routes/adminRoute");
const emailRoutes   = require("./routes/emailRoute")
const cartRoutes     = require("./routes/cartsRoute")


// dotenv.config();
express.Router()   
const app = express();
const PORT = process.env.PORT || 9000;

//  MUST BE BEFORE ROUTES
app.use(express.json());    // middleware 
app.use(express.urlencoded({ extended: true }));

// 1.routes mount it // DefaultRoute
// middleware route.
app.use("/api/products", productRoutes);  // prefix  variablename
app.use("/api/admin", adminRoutes);
app.use("/api/email",emailRoutes)
app.use("/api/cart",cartRoutes)

//  static for images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Register route  --> AI
app.post("/register", (req, res) => {
  const { name, email } = req.body || {};
  console.log("name:", name, "email:", email);
  res.send("Success");
});

//  connect + listen only once
mongoose
  .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 30000, family: 4 })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log("Server running", PORT));
  })
  .catch((err) => {
    console.log("MongoDB error:", err.message);
    process.exit(1);
  });