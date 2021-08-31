const todoEntity = require("../../../domain/Core/todo/todoEntity");
const todos = require("../models/todo");
const ApiError = require("../../../http/utils/ApiError");
const httpStatus = require("http-status");
class TodoRepository{
    
    static async create(todoBody) {
        const todo = new todos(todoBody);
        todo.save();
        return todo;
    }

    static async find(queryParams) {
      const {_id,owner} = queryParams;
      const todoID = await todos.findOne({ _id , 'owner': owner})      
      if(!todoID){
          throw new ApiError(httpStatus.NOT_FOUND,"You dont have Todo against this ID!!")
      }
      
      return todoEntity.createFromObject(todoID);
    }

    static async update(todoBody){

      const {updates,id,owner,body} = todoBody;
      const todoUp = await todos.findOne({_id:id, owner})  
      if(!todoUp){
          throw new ApiError(httpStatus.NOT_FOUND, "todo not found!!");
      }
      updates.forEach( update => todoUp[update] = body[update] )
      const updateTodo = await todoUp.save();
      return updateTodo;
    }
    
    static async delete(queryParams) {
      const {_id,owner} = queryParams;
      const delTodo = await todos.findOneAndDelete({ _id, owner })
      if(!delTodo){
          throw new ApiError(httpStatus.NOT_FOUND,"No Todo Found against this ID")
      }
      return delTodo;
    } 
      
}

module.exports = TodoRepository

