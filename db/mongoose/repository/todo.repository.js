
class TodoRepository{
    
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
        return new Promise((resolve, reject) => {
          Model.find({})
            .limit(parseInt(queryParams.limit))
            .exec(function(err, data) {
              if (err) reject(err);
              resolve(data);
            });
        });
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

module.exports = TodoRepository

