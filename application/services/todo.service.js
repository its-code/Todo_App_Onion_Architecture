const TodoRepository = require("../../db/mongoose/repository/todo.repository");
const httpStatus = require("http-status")
const ApiError = require("../../http/utils/ApiError")
class TodoService {
    
    static async createTodo(todoBody){

        const todoCreated = await TodoRepository.create(todoBody);
        return todoCreated;
    }

    static async findTodos(res){
        res.json(res.paginatedResults)   
    }

    static async findOneTodo(todoBody){

        const {_id,owner} = todoBody
        const todoID = await TodoRepository.find({_id,owner});
        return todoID
    }

    static async updateTodo(todoBody){
        const {updates,id,owner,body} = todoBody;
        const propertiestodo = ['name','discription']
        const isValid = updates.every( update => propertiestodo.includes(update))
        if(!isValid)
            throw new ApiError(httpStatus.FORBIDDEN,"inputs are invalid")  
                  
        const updateTodo = await TodoRepository.update({updates,id,owner,body});
        return updateTodo;
    }

    static async deleteTodo(todoID){

        const {id: _id,owner} = todoID;
        await TodoRepository.delete({ _id, owner})
       
        return {message: "Todo Deleted Successfully!!!"};
    }

}

module.exports = TodoService