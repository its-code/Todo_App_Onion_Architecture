const TodoService = require("../../application/services/todo/todo.service")
const catchAsync = require("../utils/catchasync")
const httpStatus = require("http-status")

class TodoController {

    static createTodo = catchAsync(async (req,res) => {
        
        const {body:{discription,name},user:{_id:owner}} = req;
        const todo = await TodoService.createTodo({discription,name,owner})
        res.status(httpStatus.CREATED).send(todo);

    });

    static findTodos = catchAsync(async (req,res) =>{
        const todo = await TodoService.findTodos(res);
        res.status(httpStatus.OK).send(todo)
    });

    static findOneTodo = catchAsync(async (req,res) => {
        const {params: {id : _id}, user:{_id : owner}} = req;
        const todoID = await TodoService.findOneTodo({_id, owner})
        res.status(httpStatus.OK).send(todoID)
    });

    static updateTodo = catchAsync(async (req,res) => {
        const {params: {id},body,user:{_id: owner}} = req;
        const updates = Object.keys(body)
        const todo = await TodoService.updateTodo({id,updates,owner,body})
        res.status(httpStatus.OK).send(todo)
    });

    static deleteTodo = catchAsync(async (req,res) => {
        const {params: {id}, user:{_id:owner}} = req;
        const deleteTodo = await TodoService.deleteTodo({id,owner})
        res.status(httpStatus.OK).send(deleteTodo)
    });
    
}

module.exports = TodoController
