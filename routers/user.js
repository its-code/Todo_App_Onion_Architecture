const express = require('express')
const auth = require('../middleware/auth')
const user = require("../models/user")
const router = new express.Router() 


// Routers for users (HTTP Method : post,get,patch and delete)

router.post('/users',async (req,res)=>{  
    const me = new user(req.body)
    try{
      await me.save()
      const token = await me.generateAuthToken()
      res.status(201).send({me,token})  
    }catch(e){
      res.status(500).send(e)  
    }
})

router.post('/users/login',async (req,res) =>{
    try{
        const userAuth = await user.findByCredentials(req.body.email,req.body.password)
        const token = await userAuth.generateAuthToken()

        res.send({userAuth, token})
    }catch(e){
        res.status(400).send(e)
    }    
})

router.post('/users/logout', auth,async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token) 
        await req.user.save()
        res.send()
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
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})


module.exports = router