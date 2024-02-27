const express = require("express");

// contains callback Funcs implementation
const controller = require("./../Controller/teacherContoller");
const validator = require("./../Middleware/Validations/Validator");
const {insertTeacher, updateTeacher, deleteTeacher, getOneTeacher} = require("./../Middleware/Validations/TeacherValidation");
const {isBasicAdmin, isTeacher, isBasicAdminOrTeacher} = require("./../Middleware/Auth/authenticationMiddleware");

const router = express.Router();

router.route("/teachers")
    .get(isBasicAdminOrTeacher, controller.getAllTeachers)
    .post(isBasicAdmin, insertTeacher, validator, controller.addNewTeacher)
    .patch(isTeacher, updateTeacher, validator, controller.updateTeacherData)
    
router.get("/teachers/supervisors", isBasicAdminOrTeacher, controller.getAllSupervisors)

router.route("/teachers/:id")
    .get(isBasicAdmin, getOneTeacher, validator, controller.getTeacherById)
    .delete(isBasicAdmin, deleteTeacher, validator, controller.deleteTeacher)

module.exports = router;