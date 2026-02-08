const Product = require("../models/Product");


exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getProducts = async (req, res) => {
    try {
      const { category, certification_status, search, supplier_id, page = 1, limit = 10 } =
        req.query;
  
      let filter = {};
  

      if (category) {
        filter.category = category;
      }
  

      if (certification_status) {
        filter.certification_status = certification_status;
      }

      if (supplier_id) {
        filter.supplier_id = supplier_id;
      }
  
 
      if (search) {
        filter.name = { $regex: search, $options: "i" };
      }
  
      const skip = (page - 1) * limit;
  
      const total = await Product.countDocuments(filter);
  
      const products = await Product.find(filter)
        .populate("supplier_id", "name country")
        .skip(skip)
        .limit(Number(limit));
  
      res.status(200).json({
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
        data: products,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
