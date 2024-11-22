const mongoose = require('mongoose');

const upcomSchema = new mongoose.Schema({
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

const Upcom = mongoose.model('Upcom',upcomSchema);
module.exports = Upcom;