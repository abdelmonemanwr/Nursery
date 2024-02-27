const {body, query, param} = require("express-validator");
const mongoose = require("mongoose");

exports.insertTeacher = [
    body("_id").custom((value, { req, res, next }) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error("teacher id must be a valid ObjectId");
        }
        return true;
    }).withMessage("teacher id must be a valid ObjectId"),
    
    body("fullname").isString().withMessage("fullname must be a string").isLength({min:7}).withMessage("teacher's fullname length must be at least 7 characters"),
    
    body("password").isString().withMessage("password must be a string").isLength({min:10}).withMessage("teacher's password length must be at least 10 characters"),

    body("email").isEmail().withMessage("email must be a string").isLength({min:12}).withMessage("teacher's email length must be at least 12 characters"),
    
    body("image").isString().withMessage("image path must be a string"),
]
 
exports.updateTeacher = [
    body("_id").custom((value, { req, res, next }) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error("teacher id must be a valid ObjectId");
        }
        return true;
    }).withMessage("teacher id must be a valid ObjectId"),
    
    body("fullname").optional().isString().withMessage("fullname must be a string").isLength({min:7}).withMessage("teacher's fullname length must be at least 7 characters"),
    
    body("password").optional().isString().withMessage("password must be a string").isLength({min:10}).withMessage("teacher's password length must be at least 10 characters"),

    body("email").optional().isEmail().withMessage("email must be a string").isLength({min:12}).withMessage("teacher's email length must be at least 12 characters"),
    
    body("image").optional().isString().withMessage("image path must be a string"),
]

exports.deleteTeacher = [
    param("id").custom((value, {req, res, next})=>{
        if(!mongoose.Types.ObjectId.isValid(value)){
            throw new Error("teacher id must be a valid ObjectId");
        }
        return true;
    }).withMessage("teacher id must be a valid ObjectId"),
]

exports.getOneTeacher = [
    param("id").custom((value, { req, res, next }) => {
        console.log(`value = ${value}`);
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error("teacher id must be a valid ObjectId");
        }
        else return true;
    }).withMessage("teacher id must be a valid ObjectId"),
];
