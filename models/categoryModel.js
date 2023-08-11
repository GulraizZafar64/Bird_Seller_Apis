const mongoose = require('mongoose');

const categoryModel=new mongoose.Schema({
    name: String,
    subcategories: [{ type: mongoose.Schema.ObjectId, ref: 'Subcategory' }]
})
module.exports=mongoose.model("Category",categoryModel)
