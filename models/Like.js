const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const likeSchema = new Schema({
    message_id:{
        type:mongoose.Schema.ObjectId
    },

    liked_by_id:{
        type:mongoose.Schema.ObjectId,
    }
    
})

const Like = mongoose.model('Like', likeSchema)

module.exports = Like