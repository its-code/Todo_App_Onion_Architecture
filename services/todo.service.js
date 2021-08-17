const todos = require("../models/todo")


class TodoService {
    
    static async createTodo(todoBody){

        const todo = new todos(todoBody)
        await todo.save()
        return todo;
    }

}

module.exports = TodoService