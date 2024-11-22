const mongoose = require('mongoose');

const outdatedSchema = new mongoose.Schema({
    ename:{
        type:String,
        required:true
    },
    edescription:{
        type:String,
        required:true
    },
    eimage:{
        type:String,
        required:true
    },
    etiming: {
        type:String,
        required:true
    },
    eclub: {
        type: String,
        required:true
    },
    evenue: {
        type:String,
        required:true
    }
})

const Outdate = mongoose.model('Outdated',outdatedSchema);
module.exports = Outdate;