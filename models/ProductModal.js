const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
   name:{
       type:String,
       required:[true,"Please enter product name"],
       trim:true    
    },
   description:{
    type:String,
    required:[true,"Please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
        maxlength:[8,"Price cannot exceed 8 characters"]
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    subcategory:{
        type: mongoose.Schema.ObjectId, ref: 'Subcategory' 
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
        
})

module.exports=mongoose.model("Product",productSchema)