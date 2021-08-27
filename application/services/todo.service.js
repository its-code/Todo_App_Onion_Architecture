const todos = require("../../db/mongoose/models/todo");
const TodoRepository = require("../../db/mongoose/repository/todo.repository");
const httpStatus = require("http-status")
const ApiError = require("../../http/utils/ApiError")

class TodoService {
    
    static async createTodo(todoBody){

        const todo = new todos(todoBody);
        const todoCreated = await TodoRepository.create(todo);
        return todoCreated;
    }

    static async findTodos(){
        const todos = json(res.paginatedResults)
        return todos;
    }

    static async findOneTodo(todoBody){

        const todoID = await todos.findOne({ _id: todoBody._id , 'owner': todoBody.owner})      
        if(!todoID){
            throw new ApiError(httpStatus.NOT_FOUND,"Todo Not Found!!")
        }
        return todoID;
    }

    static async updateTodo(todoBody){
        const updates = todoBody.updates;
        const propertiestodo = ['name','discription']
        const isValid = updates.every( update => propertiestodo.includes(update))
        if(!isValid)
            throw new ApiError(httpStatus.FORBIDDEN,"inputs are invalid")  
                  
        const todoUp = await todos.findOne({_id: todoBody.id, owner: todoBody.owner})  
        if(!todoUp){
            throw new ApiError(httpStatus.NOT_FOUND, "todo not found!!")
        }
        updates.forEach( update => todoUp[update] = req.body[update] )

        const updateTodo = await todoUp.save();

        return updateTodo;
    }

    static async deleteTodo(todoID){

        const deltodo = await todos.findOneAndDelete({ _id:todoID.id, owner: todoID.owner })
        if(!deltodo){
            throw new ApiError(httpStatus.NOT_FOUND,"No Todo Found against this ID")
        }
        
        return deltodo;
    }

}

module.exports = TodoService