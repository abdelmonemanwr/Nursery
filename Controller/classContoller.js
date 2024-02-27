const Teacher = require("./../Model/Teacher");
const Class = require("./../Model/Class");
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

exports.addNewClass=(req, res, next)=>{
    const obj = new Class(req.body);
    obj.save()
    .then(data=>{
        res.status(201).json({data});
    })
    .catch(error=>{
        next(error);
    })
}

// BUG!
exports.updateClassData = (req, res, next)=>{
    let ID = req.body._id;
    delete req.body._id;
    Class.findByIdAndUpdate(ID, req.body)
    .populate({ path: "supervisor", select: {_id: 0, fullname: 1 } }) 
    .then(data=>{
        data?res.status(200).json({data}):next(new Error("Class not found"));
    })
    .catch(error=>{
        next(error);
    })
}

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