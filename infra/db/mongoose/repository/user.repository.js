
const userEntity = require("../../../../domain/Core/user/userEntity")
const User = require("../models/user");
const generateAuthToken = require("../../../utils/jwt")


class UserRepository{
    
    static async add(userBody) {

      const me = new User(userBody)
      await me.save()
      const token = await generateAuthToken(me);  
      return {me,token};
      
    }

    static async find(id){

        const userID= await User.findById(id)
        return userEntity.createFromObject(userID);

    }

    static async update(userBody){
      
      const {updates,user,body} = userBody;

      updates.forEach((update)=>{
        user[update] = body[update]
      })
      
      await user.save()
    }
    
    static async remove(user) {
      await user.remove();
    } 

      
}

module.exports = UserRepository


