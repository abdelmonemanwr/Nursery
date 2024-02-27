const {body, query, param} = require("express-validator");
const mongoose = require("mongoose");

exports.insertClass = [
    // bcoz it's auto generated
    //body("_id").isInt().withMessage("id must be an integer"),

    body("name").isString().withMessage("name must be string").isLength({min:9}).withMessage("Class's name length must be at least 9 characters"),

    // body("supervisor").isInt().withMessage("supervisor must be an integer, which indicates the teacher's id"),

    body("supervisor").isMongoId().withMessage("supervisor must be an integer, which indicates the teacher's id"),

    body("children").isArray().withMessage("children must be an array which indicates the ids of the children in this class"),

    body('children.*').isInt().withMessage("each child must be an integer")
]

exports.updateClass = [
    body("_id").isInt().withMessage("id must be an integer"),

    body("name").optional().isString().withMessage("name must be string").isLength({min:9}).withMessage("Class's name length must be at least 9 characters"),

    // body("supervisor").optional().isInt().withMessage("supervisor must be an integer, which indicates the teacher's id"),
    
    // should we allow to update the supervisor id?
    body("supervisor").optional().isMongoId().withMessage("supervisor must be an integer, which indicates the teacher's id"),

    body("children").optional().isArray().withMessage("children must be an array which indicates the ids of the children in this class"),

    // it isn't mandatory to check all the elements in the array to be optional, is it?
    body('children.*').optional().isInt().withMessage("each child must be an integer")
]

exports.getOneClass = [
    param("id").isInt().withMessage("class's id must be an integer")
]

exports.deleteClass = [
    param("id").isInt().withMessage("class's id must be an integer")
]

exports.getClassChildren = [
    param("id").isInt().withMessage("class id must be number to get all class children"),
]

exports.getSupervisorsInfoByClassID = [
    // param("id").isMongoId().withMessage("class supervisor id must be objectID"),
    param("id").isInt().withMessage("class supervisor id must be Number"),
]