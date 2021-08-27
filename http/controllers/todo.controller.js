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
        const todo = await TodoService.findTodos();
        res.status(httpStatus.OK).send(todo)
    });

    static findOneTodo = catchAsync(async (req,res) => {
            
        const _id = req.params.id
        const todoID = await TodoService.findOneTodo({_id, owner: req.user._id})
        res.status(httpStatus.OK).send(todoID)
    });

    static updateTodo = catchAsync(async (req,res) => {
        const {id} = req.params;
        const updates = Object.keys(req.body) 
        const todo = await TodoService.updateTodo({id,updates,owner: req.user._id})
        res.status(httpStatus.OK).send(todo)
    });

    static deleteTodo = catchAsync(async (req,res) => {
        const {id} = req.params;
        const deleteTodo = await TodoService.deleteTodo({id,owner: req.user._id})
        res.status(httpStatus.OK).send(deleteTodo)
    });
    
}

module.exports = TodoController
