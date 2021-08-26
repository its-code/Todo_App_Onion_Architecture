const faker = require("faker")
const User = require("./db/mongoose/models/user")
const Todo = require("./db/mongoose/models/todo")

const seedUsers = async () => {

    try {

        // const countCollection = await User.find({});
        
        // if(countCollection.length > 1){
        //     return 
        // }

        const quantity = 10;
        const users = [];

        for(let u=0; u<quantity; u++){
            users.push(
                new User({
                   name: faker.internet.userName(),
                   email: faker.internet.email(),
                   password: faker.internet.password(),
                   age: faker.datatype.number(),
                })
            )
        }

        // await User.remove()

        // users.forEach(user => {
        //     User.create(user)
        // })

        console.log(users)

        console.log("User collection has been populated!!");

    } catch (error) {
        console.log(error)
    }
}


const seedTodos = async () => {

    try {

        // const countCollection = await Todo.find({});
        
        // if(countCollection.length > 1){
        //     return 
        // }
        
        const quantity = 10;
        const todos = [];

        for(let t=0; t<quantity; t++){
            todos.push(
                new Todo({
                   name: faker.name.jobTitle(),
                   discription: faker.name.jobDescriptor(),
                   owner: faker.datatype.uuid()
                })
            )
        }


        // await Todo.remove()

        // todos.forEach(todo => {
        //     Todo.create(todo)
        // })
        console.log(todos)

        console.log("Todo collection has been populated!!");

    } catch (error) {
        console.log(error)
    }
}

seedUsers();
seedTodos();

