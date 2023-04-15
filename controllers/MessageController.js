
const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose')

// Message model
const Message = require('../models/Message')
const Like = require('../models/Like')

const sendMessageAPI = (req, res) => {
            const content = req.body.content
            const sender_id = req.body.sender_id
            const receiver_id = req.body.receiver_id
            
            const new_message = new Message({
                "content":content,
                "sender_id": new mongoose.Types.ObjectId(sender_id),
                "receiver_id":new mongoose.Types.ObjectId(receiver_id),
                "date":new Date()
            })
            new_message.save()
            return res.send({
                "msg":"Message sent successfully"
            })

    
}


const previewMessagesAPI = (req, res) => {
    const sender_id = new mongoose.Types.ObjectId(req.query.sender_id)
    const receiver_id = new mongoose.Types.ObjectId(req.query.receiver_id)
     console.log(sender_id)
     console.log(receiver_id)
    Message.aggregate([
        {$match: {"$or": [{sender_id: sender_id,receiver_id:receiver_id},{sender_id:receiver_id,receiver_id:sender_id}]}},
        
        {
            $lookup:{
                from:'users',
                localField:'sender_id',
                foreignField:'_id',
                as:'reciever'
            }
            
        },

        {
            $lookup:{
                from:'likes',
                localField:'_id',
                foreignField:'message_id',
                as:'likes'
            }
            
        }
    ]).then(messages=>{
        console.log(messages)
        res.json({
            "messages":messages
        })
    })
}

const deleteMessageAPI = (req, res) => {
    const message_id = new mongoose.Types.ObjectId(req.query.message_id)
        Message.findByIdAndDelete(message_id).then(() => {
            return res.send({
                "msg":"Deleted"
            })
        })
}

const LikeAPI = (req, res) => {
    const message_id = new mongoose.Types.ObjectId(req.body.message_id)
    const liked_by_id = new mongoose.Types.ObjectId(req.body.liked_by_id)

    Like.findOne({$and:[{"message_id":message_id}, {"liked_by_id":liked_by_id}]}).then((like) => {
        if(like){
            Like.findByIdAndDelete(like._id).then(() => {
                return res.send({
                    "msg":"Unliked successfully"
                })
            })
        }else{
            const like = new Like({
                "message_id":message_id,
                "liked_by_id":liked_by_id,
                })
                like.save()
                return res.send({
                    "msg":"Liked successfully"
                })
        }
    })

    

}
        

module.exports = {
    sendMessage: sendMessageAPI,
    previewMessages:previewMessagesAPI,
    deleteMessage:deleteMessageAPI,
    like:LikeAPI
}