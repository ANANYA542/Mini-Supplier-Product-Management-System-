const Supplier = require("../models/Supplier");
const Product = require("../models/Product");


exports.createSupplier = async (req, res) => {
    try {
    //   console.log("BODY:", req.body); 
      const supplier = await Supplier.create(req.body);
      res.status(201).json(supplier);
    } catch (error) {
    //   console.error(error); 
      res.status(400).json({ message: error.message });
    }
  };
  

exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    const products = await Product.find({ supplier_id: req.params.id });

    res.json({ supplier, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
