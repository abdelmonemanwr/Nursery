const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        let token = req.get("authorization").split(" ")[1];
        console.log(`token = ${token}`);
        let decodedToken = jwt.verify(token, "secret");
        req.token = decodedToken;
        next();
    } catch (error) {
        error.message = "Not Authenticated";
        error.status = 401;
        next(error);
    }
}

module.exports.isBasicAdmin = (req, res, next)=>{
    if(req.token.role == "basicAdmin"){
        next();
    } else {
        let error = new Error("Not Authorized");
        error.status = 403;
        next(error);
    }
}

module.exports.isTeacher = (req, res, next)=>{
    if(req.token.role === "teacher"){
        next();
    } else {
        let error = new Error("Not Authorized");
        error.status = 403;
        next(error);
    }
}

module.exports.isChild = (req, res, next) => {
    if(req.token.role === "child"){
        next();
    } else {
        let error = new Error("Not Authorized");
        error.status = 403;
        next(error);
    }
}

module.exports.isBasicAdminOrTeacher = (req, res, next)=>{
    if(req.token.role == "basicAdmin" || req.token.role == "teacher"){
        next();
    } else {
        let error = new Error("Not Authorized");
        error.status = 403;
        next(error);
    }
}

module.exports.isBasicAdminOrChild = (req, res, next)=>{
    if(req.token.role == "basicAdmin" || req.token.role == "child"){
        next();
    } else {
        let error = new Error("Not Authorized");
        error.status = 403;
        next(error);
    }
}