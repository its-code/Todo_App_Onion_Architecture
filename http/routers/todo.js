const express =  require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const todoController = require("../controllers/todo.controller")
const paginatedResults = require("../../db/models/plugin/pagination.plugin")
const todos = require("../../db/models/todo")


// Routers for todos (HTTP Method : get,post,patch and delete)

router.post('/todos',auth,todoController.createTodo)

// get todos?completed = true etc

router.get('/todos',auth,paginatedResults(todos), todoController.findTodos)

router.get('/todo/:id',auth, todoController.findOneTodo)

router.patch('/todos/:id',auth, todoController.updateTodo)

router.delete('/todos/:id',auth, todoController.deleteTodo)

module.exports = router