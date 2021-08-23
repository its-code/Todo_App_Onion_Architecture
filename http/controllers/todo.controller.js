const todos = require("../../db/models/todo")
const TodoService = require("../../services/todo.service")

class TodoController {

    static async createTodo(req,res){

        const {discription,name} = req.body;
        
        try{
            const todo = await TodoService.createTodo({discription,name,owner: req.user._id})
           res.status(201).send(todo)
        }catch(e){
           res.status(500).send(e)
        }
    }

    static async findTodos(req,res){
        const match = {}
        const sort = []
    
        if(req.query.completed){
            match.completed = req.query.completed === 'true'
        }
        if(req.query.sortBy){
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc'? -1 : 1
        }
    
        try{
            await req.user.populate({
                path: 'todos',
                match,
                option: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                }
            }).execPopulate()
    
            res.send(req.user.todos)
            }catch(e){
                res.status(400).send(e)
            }
    }

    static async findOneTodo(req,res){
        const _id = req.params.id


        try{
            // const todoID= await todos.findById(_id)
            const todoID = await todos.findOne({ _id , 'owner': req.user._id})      
            console.log(todoID)    
            if(!todoID){
              return res.status(404).send()
            }
            res.send(todoID)
      
          }catch(e){
              res.status(400).send(e)
          }
    }

    static async updateTodo(req,res){

        const updates = Object.keys(req.body) 
        const propertiestodo = ['name','discription']
        const isValid = updates.every( update => propertiestodo.includes(update))
    
        if(!isValid)
            return res.status(400).send()
    
        try{
    
          const todoUp = await todos.findOne({_id: req.params.id, owner: req.user._id})  
        //   const todoUp = await todos.findByIdAndUpdate(req.params.id, req.body , { new:true, runValidators: true})
          if(!todoUp){
             return res.status(404).send()
          }
          updates.forEach( update => todoUp[update] = req.body[update] )
    
          await todoUp.save()
          res.send(todoUp)
        }catch(e){
            res.status(400).send(e)
        }
    }

    static async deleteTodo(req,res){
        try{
            const deltodo = await todos.findOneAndDelete({ _id:req.params.id, owner: req.user._id })
            if(!deltodo){
                return res.status(404).send()
            } 
            res.send(deltodo)
        }catch(e){
            res.status(400).send(e)
        }
    }
}

module.exports = TodoController
