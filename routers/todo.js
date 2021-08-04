const express =  require("express")
const router = express.Router()
const todos = require("../models/todo")

// Routers for todos (HTTP Method : get,post,patch and delete)

router.post('/todos',async (req,res)=>{ 

    const todo = new todos({
        ...req.body,
    })

    try{
       await todo.save()
       res.status(201).send(todo)
    }catch(e){
       res.status(500).send(e)
    }
    
})


module.exports = router