const express = require('express')
const user = require("../models/user")
const router = new express.Router() 


// Routers for tasks (HTTP Method : post,get,patch and delete)

router.post('/users',async (req,res)=>{  
    const me = new user(req.body)
    try{
      await me.save()
      res.status(201).send(me)  
    }catch(e){
      res.status(500).send(e)  
    }
})


module.exports = router