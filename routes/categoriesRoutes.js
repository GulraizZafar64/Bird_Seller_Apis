const express=require('express');
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { getAllSubcategories, createSubcategory, updateSubcategory, deleteSubcategory } = require('../controllers/subCategoryController');

const router =express.Router();
router.route("/categories").get(getAllCategories)
router.route("/sub-categories").get(getAllSubcategories)
router.route("/category").post(createCategory)
router.route("/sub-category").post(createSubcategory)
router.route("/category/:id").put(updateCategory)
router.route("/sub-category/:id").put(updateSubcategory)
router.route("/category/:id").delete(deleteCategory)
router.route("/sub-category/:id").delete(deleteSubcategory)


module.exports=router