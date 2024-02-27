const Teacher = require("./../Model/Teacher");
const Class = require("./../Model/Class");
const Child = require("./../Model/Child");
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

exports.getAllClasses=(req, res, next)=>{
    Class.find()
    .populate({path: "supervisor", select: {_id: 0, fullname: 1 } })
    .populate({path: "children", select: { _id: 0, fullname: 1, age: 1 } })
    .then((data)=>{
        res.status(200).json({data});
    })
    .catch(error=>{
        next(error);
    });
}

exports.addNewClass= async (req, res, next)=>{
    const obj = new Class(req.body);
    try {
        let existChild = await Child.find({ _id: { $in: req.body.children } });
        let existSuper = await Teacher.findById(req.body.supervisor);
    } catch (error) {
        return next(error);
    }
    obj.save()
    .then(data=>{
        if(!(existChild.length == req.body.children.length && existSuper))
            return next(new Error("supervisor or child doesn't exist"));
        res.status(201).json({data});
    })
    .catch(error=>{
        next(error);
    })
}

exports.updateClassData = async (req, res, next) => {
    try {
        let ID = req.body._id;
        delete req.body._id;

        const updatedClass = await Class.findByIdAndUpdate(ID, req.body)
            .populate({ path: "supervisor", select: { _id: 0, fullname: 1 } });

        if (req.body.children) {
            const existChild = await Child.find({ _id: { $in: req.body.children } });
            if (existChild.length !== req.body.children.length) {
                return next(new Error("child doesn't exist"));
            }
        }

        if (req.body.supervisor) {
            const supervisorData = await Teacher.findById(req.body.supervisor);
            if (!supervisorData) {
                return res.status(400).json({ "error": "supervisor doesn't exist" });
            }
        }

        updatedClass ? res.status(200).json({ data: updatedClass }) : next(new Error("Class not found"));
    } catch (error) {
        next(error);
    }
};

exports.getClassById=(req, res, next)=>{
    Class.findById(req.params.id)
    .populate({path: "supervisor", select: {_id: 0, fullname: 1 } })
    .populate({path: "children", select: { _id: 0, fullname: 1, age: 1 } })
    .then(data=>data?res.status(200).json({data}):next(new Error("Class not found")))
    .catch(error=>next(error))
}

exports.deleteClassById=(req, res, next)=>{
    Class.findByIdAndDelete(req.params.id)
    .then(data=>{
        data?res.status(200).json({"deleted data: ": data}):next(new Error("Class doesn't exist"));
    })
    .catch(error=>next(error))
}

exports.getClassChildren=(req, res, next)=>{
    Class.findById(req.params.id)
        .populate({ path: "children", select: { _id: 0, fullname: 1, age: 1 } })
        .then(data => {
            console.log("data: ", data);
            res.status(200).json(data);
        })
        .catch(error => next(error));
}

exports.getSupervisorsInfoByClassID=(req, res, next)=>{
    Class.findById(req.params.id)
    .populate({ path: "supervisor", select: {_id: 0, fullname: 1, email: 1 , image: 1  } })
    .then(data=>{
        data?res.status(200).json({"super":data.supervisor}):next(new Error("supervisor doesn't exist"));
    })
    .catch(error=>next(error))
}