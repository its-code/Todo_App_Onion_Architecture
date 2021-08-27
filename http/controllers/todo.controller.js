const todos = require("../../db/mongoose/models/todo")
const TodoService = require("../../application/services/todo.service")
const catchAsync = require("../utils/catchasync")
const httpStatus = require("http-status")

class TodoController {

    static createTodo = catchAsync(async (req,res) => {

        const {discription,name} = req.body;
        const todo = await TodoService.createTodo({discription,name,owner: req.user._id})
        res.status(httpStatus.CREATED).send(todo);

    });

    static findTodos = catchAsync(async (req,res) =>{
     
        res.status(httpStatus.CREATED).json(res.paginatedResults)
    });

    static findOneTodo = catchAsync(async (req,res) => {
            
            const _id = req.params.id
            const todoID = await todos.findOne({ _id , 'owner': req.user._id})      
            if(!todoID){
              return res.status(404).send()
            }
            res.status(httpStatus.CREATED).send(todoID)
    });

    static updateTodo = catchAsync(async (req,res) => {

        const updates = Object.keys(req.body) 
        const propertiestodo = ['name','discription']
        const isValid = updates.every( update => propertiestodo.includes(update))
    
        if(!isValid)
            return res.status(400).send()
        
        const todoUp = await todos.findOne({_id: req.params.id, owner: req.user._id})  
        if(!todoUp){
            return res.status(404).send()
        }
        updates.forEach( update => todoUp[update] = req.body[update] )

        await todoUp.save()
        res.status(httpStatus.CREATED).send(todoUp)
    });

    static deleteTodo = catchAsync(async (req,res) => {
        const deltodo = await todos.findOneAndDelete({ _id:req.params.id, owner: req.user._id })
        if(!deltodo){
            return res.status(404).send()
        } 
        res.status(httpStatus.CREATED).send(deltodo)
    });
    
}

module.exports = TodoController
