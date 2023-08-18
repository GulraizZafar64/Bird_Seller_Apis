const Product=require("../models/productModel")
const catchAsyncError=require('../middleware/catchAsyncError')
const cloudinary=require("cloudinary")

///create Product--admin

exports.createProduct=async (req,res,next)=>{
//ya neacha haa k agr user na ak he image di toh ussa images wali array ma push krdo agr zada haa toh images wali array ko wasa he req.body k equal krdiya usma push hojaya gi

try {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
    const product=await Product.create(req.body)
  
    res.status(201).json({
        success:true,
        product
    })
} catch (error) {
   console.log(error)
}
  }
//get all products


exports.getAdminProducts=async (req,res)=>{
 const products=await Product.find()

  res.status(201).json({
   success:true,
   products,

})
}
