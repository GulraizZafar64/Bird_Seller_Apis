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

exports.createCategory = async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });
  try {
    const newCategory = await category.save();
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.updateCategory = async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        { $set: { name: req.body.name } },
        { new: true }
      );
      res.json(category);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  exports.deleteCategory = async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      await Subcategory.deleteMany({ category: req.params.id });
      await category.remove();
  
      res.json({ message: 'Category deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
