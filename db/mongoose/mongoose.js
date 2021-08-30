const mongoose = require('mongoose')
const {MONGODB_URL} = require("../../config/mongoose.config")
// Connecting Mongoose to MongoDB and also specify the Database Name
mongoose.connect(MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err))



