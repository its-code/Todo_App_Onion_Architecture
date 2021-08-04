const express = require('express')
const user = require("../models/user")
const router = new express.Router() 


// Routers for users (HTTP Method : post,get,patch and delete)

router.post('/users',async (req,res)=>{  
    const me = new user(req.body)
    try{
      await me.save()
      res.status(201).send(me)  
    }catch(e){
      res.status(500).send(e)  
    }
})

router.get('/users/:id',async (req,res)=>{
    
  try{
    const _id = req.params.id
    const userID= await user.findById(_id)
      
    if(!userID){
      return res.status(404).send()
    }
    res.send(userID)

  }catch(e){
      res.status(400).send(e)
  }
})


router.patch('/users/me', auth ,async (req,res)=>{
    
  const updates = Object.keys(req.body) 
  const propertiesUsers = ['name','email','password','age']
  const isValid = updates.every( update => propertiesUsers.includes(update))

  if(!isValid)
      return res.status(400).send()

  try{
      updates.forEach((update)=>{
          req.user[update] = req.body[update]
      })

    await req.user.save()  
    res.send(req.user)
  }catch(e){
      res.status(400).send(e)
  }
})

router.delete('/users/me',auth ,async (req,res)=>{
  try{
      await req.user.remove()
      //sendFairwellEmail(req.user.email,req.user.name)
      res.send(req.user)
  }catch(e){
      res.status(400).send(e)
  }
})


module.exports = router