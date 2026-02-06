const Supplier = require("../models/Supplier");
const Product = require("../models/Product");

exports.getSummary = async (req, res) => {
  try {
    const totalSuppliers = await Supplier.countDocuments();
    const totalProducts = await Product.countDocuments();


    const productsByCategory = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

   
    const certificationStats = await Product.aggregate([
      {
        $group: {
          _id: "$certification_status",
          count: { $sum: 1 },
        },
      },
    ]);

 
    const lowStockProducts = await Product.find({
      stock_quantity: { $lt: 10 },
    }).select("name stock_quantity");

    res.status(200).json({
      totalSuppliers,
      totalProducts,
      productsByCategory,
      certificationStats,
      lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
