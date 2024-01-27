const express=require('express');
const { getAdminProducts, createProduct } = require('../controllers/productController');


const router =express.Router();
router.route("/getBirds").get(getAdminProducts)
router.route("/createBird").post(createProduct)



module.exports=router