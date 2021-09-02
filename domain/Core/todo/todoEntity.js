class Todo {

    constructor(todoID,name,discription,owner,createdAt,updatedAt){
        this.todoID = todoID;
        this.name = name;
        this.discription = discription;
        this.owner = owner;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static createFromObject(todoObj){
        return new Todo(
            todoObj._id,
            todoObj.name,
            todoObj.discription,
            todoObj.owner,
            todoObj.createdAt,
            todoObj.updatedAt
        )
    }
} 

module.exports = Todo