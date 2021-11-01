const {Schema, model} = require('mongoose');

const UserSchema =new Schema({
    fullname:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        
    },
    role:{
        type:String,
        enum:["client", 'admin'],
        default: 'client'
    },
    active: {
        type:Boolean,
        default:true
    }
});

module.exports = model("User", UserSchema);