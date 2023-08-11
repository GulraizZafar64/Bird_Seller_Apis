const mongoose = require('mongoose');

const subCategoryModel=new mongoose.Schema({
        name: String,
        category: { type: mongoose.Schema.ObjectId, ref: 'Category' },
})
module.exports=mongoose.model("Subcategory",subCategoryModel)

