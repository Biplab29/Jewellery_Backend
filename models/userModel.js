const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
 
        "user_id":{
            type: String,
            required: [true, "user_id is random $ compulsory"]
        },
        "name": {
            type: String,
            required:[true, "name is required"]
        },
        "email":{
            type:String,
            required:[true,'email is required'],
            
             validate : {
                validator:async function(email) {
                    if((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)){
                     const user = await this.constructor.findOne({email});
                     if(user) return false;//error
                     else return true;
                    }else {
                         throw new Error("Invalid email address");
                    }
                },
                message : (props)=>`${props.value}  already registered with Us!`
             }
           },
           "password": {
            type: String,
            required: [true, "password is required"],
            minlength: [6, "password must be at least 6 characters long"]
        },
        "phone_number": {
            "type": String, 
            "required": [true, "phone_number is required"]
        },
        "created": {
            type: Date,
            required:[true, "Date is requires"],
            default : new Date()
        },
},{ versionKey: false });

module.exports = mongoose.model("user", userSchema);
console.log("User Modeel is Working...");