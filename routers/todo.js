const express =  require("express")
const router = express.Router()
const todo = require("../models/todo")

// Routers for todos (HTTP Method : get,post,patch and delete)

router.post('/todos',async (req,res)=>{ 

    const todo = new todos({
        ...req.body,
        owner: req.user._id
    })

    try{
       await todo.save()
       res.status(201).send(todo)
    }catch(e){
       res.status(500).send(e)
    }
    
})

console.log("For Testing")

module.exports = router