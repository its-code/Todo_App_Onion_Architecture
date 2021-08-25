class Todo {

    constructor(name,discription){
        this.name = name;
        this.discription = discription;
    }

    setTodoName(name){
        this.name = name;
    }
    
    setTodoDiscription(discription){
        this.discription = discription;
    }

    static TodoObject(todoObj){
        const todo = new Todo(
            todoObj.name,
            todoObj.discription
        );
        
        todo.setTodoName(todoObj.name);

        todo.setTodoDiscription(todoObj.discription);

        
        return todo;
    }
    
    

} 


module.exports = Todo






