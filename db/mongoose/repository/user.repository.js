
const userEntity = require("../../../domain/Core/user/userEntity")
const User = require("../models/user");
const ApiError = require("../../../http/utils/ApiError");
const httpStatus = require("http-status");
class UserRepository{
    
    static async create(userBody) {

      const me = new User(userBody)
      await me.save()
      const token = await me.generateAuthToken()  
      return {me,token};
      
    }

    static async find(id){

        const userID= await User.findById(id)
        if(!userID){
            throw new ApiError(httpStatus.NOT_FOUND,"No User Found against this ID")
        }
        return userEntity.createFromObject(userID);

    }

    static async update(userBody){
      
      const {updates,user,body} = userBody;

      updates.forEach((update)=>{
        user[update] = body[update]
      })
      
      await user.save()
    }
    
    static async delete(user) {
        await user.remove();
    } 

      
}

module.exports = UserRepository


