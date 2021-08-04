const mongoose = require('mongoose')


const todoListSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true  
  },
  discription:{
    type: String,
    required: true,
    trim: true
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  }
},{
  timestamps: true
})

//Creating a Task Model
const Todo = mongoose.model('Todo',todoListSchema)

module.exports = Todo