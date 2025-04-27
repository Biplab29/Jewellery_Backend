const mongoose = require('mongoose');

const jewellerySchema = mongoose.Schema({
    j_id:{
        type:String,
        required:[true, "jewellery id is compulsory"],
    },
    name:{
        type:String,
        required: [true, "name is required"],
    },
    type:{    // Ring, Necklace, Bracelet
        type:String,
        required: [true, "type is required"],
    },
    material:{   // Gold, Silver, Platinum
        type:String,
        required: [true, "material is required"],
    },
    weight:{  
        type:Number,
        required: [true, "weight is required"],
    },
    price:{
        type:Number,
        required: [true, "price is required"],
    },
    image:{
        type: String, 
        required: [true, "image is required"],
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("jewellery", jewellerySchema);

console.log("Jewellery Model is working....");