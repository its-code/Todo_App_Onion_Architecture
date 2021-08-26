
const userEntity = require("../../../domain/Core/user/userEntity")
const ApiError = require("../../http/utils/ApiError")

class UserRepository{
    
    static async create(Model) {
        return new Promise((resolve, reject) => {
          Model.save(function(err, user) {
            if (err) {
              reject(err);
            }
            resolve(user);
          });
        });
      }

    static async find(Model, queryParams) {
      try {
        const user = await Model.find({})        

        if(!user){
          return false
        }
        return userEntity.createFromObject(user);

      } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error);
      }


    }
    
    static async delete(Model, queryParams) {
        return new Promise((resolve, reject) => {
          Model.find({})
            .limit(parseInt(queryParams.limit))
            .exec(function(err, data) {
              if (err) reject(err);
              resolve(data);
            });
        });
    } 
      
}

module.exports = UserRepository


