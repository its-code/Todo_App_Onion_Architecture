class Todo {

    constructor(name,discription,owner){
        this.name = name;
        this.discription = discription;
        this.owner = owner;
    }

    static createFromObject(userObj){
        return new Todo(
            userObj.name,
            userObj.discription,
            userObj.owner,
        )
    }
} 

module.exports = Todo






