const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String
    },

    password:{
        type:String,
    },

    profile_image:{
        type:String,
    },
    
})

const User = mongoose.model('User', userSchema)

module.exports = User