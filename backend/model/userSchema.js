const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({

    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    tokens: [
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
})



const Users = mongoose.model('USER',userSchema);
module.exports = Users;