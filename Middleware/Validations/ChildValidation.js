const {body, query, param} = require("express-validator");

exports.insertChild = [
    body("_id").isInt().withMessage("Child id must be number"),
    
    body("fullname").isString().withMessage("fullname must be a string").isLength({min:7}).withMessage("Child's fullname length must be at least 7 characters"),
    
    //body("age").isInt().withMessage("age must be a integer"),
    body("age").isInt().withMessage("Age must be an integer").custom((value) => {
        if (value < 2 || value > 5) {
            throw new Error("Child's age must be between 2 and 5 years old");
        }
        return true;
    }),

    body("level").isString().withMessage("Level must be a string").isIn(["PreKG", "KG1", "KG2"]).withMessage("Child's level must be one of these: PreKG, KG1, KG2"),
    
    //body("address").isString().withMessage("address must be a string"),
    body("Address").isObject().withMessage("address must be an object"),
    body("Address.city").isString().withMessage("city must be a string"),
    body("Address.street").isString().withMessage("street must be a string"),
    body("Address.building").isString().withMessage("building must be a string")
]

exports.updateChild = [
    body("_id").isInt().withMessage("Child id must be number"),
    
    body("fullname").optional().isString().withMessage("fullname must be a string").isLength({min:7}).withMessage("Child's fullname length must be at least 7 characters"),
    
    //body("age").optional().isInt().withMessage("age must be a integer"),
    body("age").optional().isInt().withMessage("Age must be an integer").custom((value) => {
        if (value < 5 || value > 8) {
            throw new Error("Child's age must be between 2 and 5 years old");
        }
        return true;
    }),

    body("level").optional().isString().withMessage("Level must be a string").isIn(["PreKG", "KG1", "KG2"]).withMessage("Child's level must be one of these: PreKG, KG1, KG2"),
    
    //body("address").isString().withMessage("address must be a string"),
    body("Address").optional().isObject().withMessage("address must be an object"),
    body("Address.city").optional().isString().withMessage("city must be a string"),
    body("Address.street").optional().isString().withMessage("street must be a string"),
    body("Address.building").optional().isString().withMessage("building must be a string")
]

exports.deleteChild = [
    param("id").isInt().withMessage("Child id must be number"),
]

exports.getOneChild = [
    param("id").isInt().withMessage("Child id must be aa number"),
]