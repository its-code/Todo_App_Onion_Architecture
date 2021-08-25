const todos = require("../../db/mongoose/models/todo");
const TodoRepository = require("../../db/mongoose/repository/todo.repository");

class TodoService {
    
    static async createTodo(todoBody){

        const todo = new todos(todoBody);
        const todoCreated = await TodoRepository.create(todo);
        return todoCreated;
    }

    static async findTodos(){

    }

}

module.exports = TodoService