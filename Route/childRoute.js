const express = require("express");

// contains callback Funcs implementation
const controller = require("./../Controller/childContoller");
const validator = require("./../Middleware/Validations/Validator");
const {insertChild, updateChild, deleteChild, getOneChild} = require("./../Middleware/Validations/ChildValidation");
const {isBasicAdmin, isTeacher, isChild, isBasicAdminOrTeacher, isBasicAdminOrChild} = require("./../Middleware/Auth/authenticationMiddleware");

// navigate endpoints of teacher
const router = express.Router();

// check url methods of all teachers
router.route("/child")
    .get(isBasicAdminOrTeacher, controller.getAllChildren)
    .post(isBasicAdmin, insertChild, validator, controller.addNewChild)
    .patch(isBasicAdminOrChild, updateChild, validator, controller.updateChildData)
    
// check url methods of a specif teacher
router.route("/child/:id")
    .get(isBasicAdminOrTeacher, getOneChild, validator, controller.getChildById)
    .delete(isBasicAdmin, deleteChild, validator, controller.deleteChild)

module.exports = router;