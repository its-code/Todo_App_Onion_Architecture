const TodoRepository = require("../../../infra/db/mongoose/repository/todo.repository");
const httpStatus = require("http-status")
const ApiError = require("../../../http/utils/ApiError")

class TodoService {
    
    static async createTodo(todoBody){
        
        const todoCreated = await TodoRepository.add(todoBody);
        return todoCreated;
    }

    static async findTodos(todoDTO){

        const todos = await TodoRepository.fetch({limit:todoDTO.limit(),page:todoDTO.getPage(),offset:todoDTO.offset()});
        if(!todos){
            throw new ApiError(httpStatus.NOT_FOUND,"You dont have Todos against this ID!!")
        }
        return todos
    }

    static async findOneTodo(todoBody){

        const {_id,owner} = todoBody
        const todoID = await TodoRepository.find({_id,owner});
        if(!todoID){
            throw new ApiError(httpStatus.NOT_FOUND,"You dont have Todo against this ID!!")
        }
        return todoID
    }

    static async updateTodo(todoBody){
        const {updates,id,owner,body} = todoBody;
        const propertiestodo = ['name','discription']
        const isValid = updates.every( update => propertiestodo.includes(update))
        if(!isValid)
            throw new ApiError(httpStatus.FORBIDDEN,"inputs are invalid")  
                  
        const updateTodo = await TodoRepository.update({updates,id,owner,body});
        if(!updateTodo){
            throw new ApiError(httpStatus.NOT_FOUND, "todo not found!!");
        }
        return updateTodo;
    }

    static async deleteTodo(todoID){

        const {id: _id,owner} = todoID;
        const delTodo = await TodoRepository.remove({ _id, owner});
        if(!delTodo){
            throw new ApiError(httpStatus.NOT_FOUND,"No Todo Found against this ID")
        }

        return {message: "Todo Deleted Successfully!!!"};
        
    }

}

module.exports = TodoService