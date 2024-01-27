const Product=require("../models/ProductModal")
const catchAsyncError=require('../middleware/catchAsyncError')
const cloudinary=require("cloudinary")

///create Product--admin

exports.createProduct=async (req,res,next)=>{
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

  res.status(400).json({
    success:false,
    message:"Something wents wronge"
})
   console.log(error)
}
  }

exports.getAdminProducts=async (req,res)=>{
  const products = await Product.find()
  .populate({
    path: 'subcategory',
    populate: {
      path: 'category',
      model: 'Category',
    },
  })
  .exec();

  res.status(201).json({
   success:true,
   products,

})
}
