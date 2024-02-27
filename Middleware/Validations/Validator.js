const {validationResult} = require("express-validator");
module.exports = (request, response, next)=>{
    // next();
    let result = validationResult(request);
    if(result.errors.length > 0){
        console.log("err:"+result.errors);
        let msg=result.errors.reduce((current,obj)=>current+obj.msg+" , ","")
        let error=new Error(msg);
        error.status=422;
        next(error);
    } else {
        next();
    }
};