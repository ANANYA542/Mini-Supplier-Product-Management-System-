const express = require("express");
const https = require("https");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const supplierRoutes = require("./routes/supplierRoutes");
const productRoutes = require("./routes/productRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const RENDER_EXTERNAL_URL = "https://mini-supplier-product-management-system.onrender.com/api";
setInterval(() => {
  https.get(RENDER_EXTERNAL_URL, (res) => {
    console.log(`[SELF-PING] Status: ${res.statusCode}`); 
  }).on("error", (err) => {
    console.log(`[SELF-PING] Failed: ${err.message}`);
  });
}, 300000); 
