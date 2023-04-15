// User model
const User = require('../models/User')
const mongoose = require('mongoose')

const bcrypt = require('bcrypt');        
const saltRounds = 10;


const signupAPI = (req, res) => {
        let hash_password;
        let username = req.body.username
        let password = req.body.password
        let profileImage = req.files.profile_image

        const filename=profileImage.name
        profileImage.mv('public/uploads/'+filename,function(err){
          if(err){
              res.send(err)
          }
        })

        bcrypt.hash(password,saltRounds,(err,hash)=>{
        hash_password = hash
        try{
            User.findOne({username:username})
            .then(result=>{
                if(result != null){
    
                return res.send({
                    "msg":"User Already Exist"
                })

            }else{
                const user = new User({
                    "username":username,
                    "password":hash_password,
                    "profile_image":filename,
                 });
    
            user.save();
            return res.send({
                "msg":"User Registered Successfully"
            })
    
            }
    
        })
        
        }
        catch(err){
        return res.status(422).send(err.message)
        }
        })
}


const signinAPI = (req, res) => {
    const {username,password} = req.body
     User.findOne({username:username})
     .then(user=>{
      if(user != null){
        bcrypt.compare(password, user.password, function(error, response) {
          console.log(response)
         if(response == true){
          console.log(user)
           res.send({
             "user":user,
             "msg":"logged in Succesfully"
           })
         }else{
           res.send({
             "msg":"Incorrect username or password"
           })
         }
      });
      }else{
       res.send({
         "msg":"Incorrect username or password"
       })
     }
  
  
     })
}

const updateprofileimageAPI = (req, res) => {
    const user_id = new mongoose.Types.ObjectId(req.body.user_id)
    const profile_image = req.files.profile_image

    const filename=profile_image.name
    profile_image.mv('public/uploads/'+filename,function(err){
          if(err){
              res.send(err)
          }
        })

    User.findById(user_id)
    .then(async (user)=>{
  
        let filter = { _id: user_id };
        let updateDoc = {
            $set: {
                "profile_image":filename,
            }
  
        }
  
        await User.updateMany(filter,updateDoc)
  
      return res.json({
        "msg":"Profile image updated successfully"
      })
  
    })
}

const updatePasswordAPI = (req, res) => {
    const user_id = new mongoose.Types.ObjectId(req.body.user_id)
    const new_password = req.body.new_password
    let hash_password;
    bcrypt.hash(new_password,saltRounds, (error, hash) => {
      hash_password = hash
    })

    User.findById(user_id)
    .then(async (user)=>{
  
        let filter = { _id: user_id };
        let updateDoc = {
            $set: {
                "password":hash_password,
            }
  
        }
  
        await User.updateMany(filter,updateDoc)
  
      return res.json({
        "msg":"Password updated succesfully"
      })
  
    })
}


const previewUsersAPI = (req, res) => {
  User.find()
  .then(users=>{
      res.json({
          "users":users
      })
  })
}

const UserProfileAPI = (req, res) => {
  const user_id = new mongoose.Types.ObjectId(req.query.user_id)
  User.findById(user_id).then((user) => {
    if(user){
      res.send({"user":user})
    }
  })
}


module.exports = {
    signup: signupAPI,
    signin: signinAPI,
    updateProfileImage:updateprofileimageAPI,
    updatePassword:updatePasswordAPI,
    previewUsers:previewUsersAPI,
    userProfile:UserProfileAPI
}