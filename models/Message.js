const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content:{
        type:String
    },

    sender_id:{
        type:mongoose.Schema.ObjectId,
    },

    receiver_id:{
        type:mongoose.Schema.ObjectId,
    },

    date:{
        type:String,
    }
    
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message