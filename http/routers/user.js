const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const userController = require("../controllers/user.controller")
const authController = require("../controllers/auth.controller")



// Routers for users (HTTP Method : post,get,patch and delete)

router.post('/users',userController.createUser)

router.post('/users/login',authController.userLogin)

router.post('/users/logout',auth,authController.userLogOut)

router.get('/users/:id',userController.getFindUser)

router.patch('/users/me',auth,userController.updateUser)

router.delete('/users/me',auth,userController.deleteUser)


module.exports = router