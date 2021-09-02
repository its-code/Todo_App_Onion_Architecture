const todoEntity = require("../../../../domain/Core/todo/todoEntity");
const todos = require("../models/todo");


class TodoRepository{
    
    static async add(todoBody) {
        const todo = new todos(todoBody);
        todo.save();
        return todo;
    }

    static async find(queryParams) {
      const {_id,owner} = queryParams;
      const todoID = await todos.findOne({ _id , 'owner': owner})      
      return todoEntity.createFromObject(todoID);
    }

    static async update(todoBody){

      const {updates,id,owner,body} = todoBody;
      const todoUp = await todos.findOne({_id:id, owner})  
      updates.forEach( update => todoUp[update] = body[update] )
      const updateTodo = await todoUp.save();
      return updateTodo;
    }
    
    static async remove(queryParams) {
      const {_id,owner} = queryParams;
      const delTodo = await todos.findOneAndDelete({ _id, owner })
      return delTodo;
    } 
      
}

module.exports = TodoRepository

