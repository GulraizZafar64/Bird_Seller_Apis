const Category = require('../models/categoryModel');
const Subcategory = require('../models/subCategoryModel');
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('subcategories');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCategory = async (req, res,next) => {
  const existingCategory = await Category.findOne({ name: req.body.name });
  if (existingCategory) {
    return res.status(200).json({success:false, message: 'Category name already taken' });
  }
  const category = new Category({
    name: req.body.name,
  });
  try {
    const newCategory = await category.save();
    res.status(200).json({
      success:true,
      message:"Created Successfully",
      data:newCategory
    });
  } catch (err) {
    res.status(400).json({success:false, message: err.message });
  }
};
exports.updateCategory = async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        { $set: { name: req.body.name } },
        { new: true }
      );
      res.status(200).json({
        success:true,
        message:"Updated Successfully",
        data:category
      });
    } catch (err) {
      res.status(400).json({success:false, message: err.message });
    }
  };
  exports.deleteCategory = async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(200).json({success:false, message: 'Category not found' });
      }
      await Subcategory.deleteMany({ category: req.params.id });
      await category.remove();
  
      res.json({success:true, message: 'Category deleted' });
    } catch (err) {
      res.status(500).json({success:false, message: err.message });
    }
  };
