const mongoose = require('mongoose');

const liveSchema = new mongoose.Schema({
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
    }
})

const Live = mongoose.model('Live',liveSchema);
module.exports = Live;
