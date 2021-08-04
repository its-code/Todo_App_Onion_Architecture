const mongoose = require('mongoose')

// Connecting Mongoose to MongoDB and also specify the Database Name
mongoose.connect('mongodb://127.0.0.1:27017/todo-api',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err))



