const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    name : String,
    description : String,
    media : [],
    creator : {
        type : mongoose.Types.ObjectId,
        enum : ['users'],
        required : true
    }

})

module.exports = mongoose.model('posts', postSchema);