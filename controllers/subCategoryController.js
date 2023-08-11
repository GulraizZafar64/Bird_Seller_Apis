// src/controllers/subcategoryController.js
const Subcategory = require('../models/subCategoryModel');
const Category = require('../models/categoryModel');

exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category','name');
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSubcategory = async (req, res) => {
  const category = await Category.findById(req.body.categoryId);
  const subcategory = new Subcategory({
    name: req.body.name,
    category: req.body.categoryId,
  });
  try {
    const newSubcategory = await subcategory.save();
    category.subcategories.push(newSubcategory._id);
    await category.save();
    res.status(200).json(newSubcategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.updateSubcategory = async (req, res) => {
    try {
      const subcategory = await Subcategory.findByIdAndUpdate(
        req.params.id,
        { $set: { name: req.body.name, category: req.body.categoryId } },
        { new: true }
      );
      res.json(subcategory);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

exports.deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    const categoryId = subcategory.category;

    // Remove the subcategory from the associated category's subcategories array
    await Category.findByIdAndUpdate(categoryId, {
      $pull: { subcategories: subcategory._id },
    });

    await subcategory.remove();

    res.json({ message: 'Subcategory deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
