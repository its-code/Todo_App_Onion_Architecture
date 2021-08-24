const ApiError = require("./ApiError")

const catchAsync = (fn) => async (req, res, next) => {
    try{
          await fn(req,res,next)
    } 
    catch(err){

      if(err instanceof ApiError){
       return  res.status(err.statusCode).send({ status: "error", message: err.message})
      }
  
      return  res.status(500).send({ status: "error", message: err.message})
    }
  };
  
  module.exports = catchAsync;