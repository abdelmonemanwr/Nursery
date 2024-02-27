const express = require("express");
const controller = require("./../Controller/classContoller");
const validator = require("./../Middleware/Validations/Validator");
const {insertClass, updateClass, getOneClass, deleteClass, getClassChildren, getSupervisorsInfoByClassID} = require("./../Middleware/Validations/ClassValidation");
const {isBasicAdmin, isTeacher, isChild, isBasicAdminOrTeacher, isBasicAdminOrChild} = require("./../Middleware/Auth/authenticationMiddleware");

const router = express.Router();

router.route("/class")
    .get(isBasicAdminOrTeacher, validator,controller.getAllClasses)
    .post(isBasicAdmin, insertClass, validator,controller.addNewClass)
    .patch(isBasicAdminOrTeacher , updateClass, validator,controller.updateClassData)

router.route("/class/:id")
    .get(isBasicAdmin, getOneClass, validator, controller.getClassById)
    .delete(isBasicAdmin, deleteClass, validator, controller.deleteClassById)
    
router.get("/class/children/:id", isBasicAdminOrTeacher, getClassChildren, validator, controller.getClassChildren);

router.get("/class/supervisor/:id", isBasicAdminOrTeacher, getSupervisorsInfoByClassID, validator, controller.getSupervisorsInfoByClassID);

module.exports = router;