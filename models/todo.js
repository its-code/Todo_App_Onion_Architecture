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
  }
},{
  timestamps: true
})

//Creating a Task Model
const Todo = mongoose.model('Todo',todoListSchema)

module.exports = Todo