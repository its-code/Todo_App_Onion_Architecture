const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
  name:{
    type: String
  },
  email:{
    type: String,
    required: true,
    unique: true,
    validate(value){
      if(!validator.isEmail(value)){
          throw new Error('Email is invalid')
      }
    }    
  },
  password:{
      type: String,
      required: true,
      trim: true,
      validate(value){
          if(value.length<6){
          throw new Error('Error, Password is less than 6!')
          }
          else if(validator.contains(value,'password')){
          throw new Error('Error, Inavlid String!')    
          }
      }  
  },
  age:{
    type: Number,
    default: 0
  },
},{
  timestamps: true
}) 


// private user data
// toJSON give us data into string so we can maniuplate it
userSchema.methods.toJSON = function(){
  const user = this
  const userObject = user.toObject()
  
  delete userObject.password

  return userObject
}



// Creating a User Model
const Users = mongoose.model('Users',userSchema)

module.exports = Users