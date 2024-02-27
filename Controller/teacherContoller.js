const Teacher = require("./../Model/Teacher");
const Class = require("./../Model/Class");

exports.getAllTeachers=(req,res,next)=>{
    Teacher.find() 
    .then((data)=>{
        res.status(200).json({data});  // ok
    })  
    .catch((error) => next(error));
};

exports.addNewTeacher=(req,res,next)=>{
    const object = new Teacher(req.body);
    object.save()
    .then((data)=>{
        res.status(201).json({data}); // created
    })  
    .catch((error)=>{
        next(error);
    });
};

exports.updateTeacherData=(req,res,next)=>{
    Teacher.findByIdAndUpdate(req.body._id, req.body)
    .then((data)=>{
        res.status(200).json({data});
    })
    .catch((error) => next(error));
};

exports.getTeacherById=(req,res,next)=>{
    Teacher.findOne({ _id: req.params.id })
    .then((data)=>{
        data?res.status(200).json({data}):next(new Error("Teacher not found"));
    })
    .catch((error) => next(error));
};

exports.deleteTeacher=(req,res,next)=>{
    Teacher.findByIdAndDelete(req.params.id)
    .then(data=>{
        data?res.status(200).json({"Deleted Data":data}):next(new Error("Teacher not found"));
    })
    .catch(error=>{
        next(error);
    })
};

exports.getAllSupervisors=(req, res, next)=>{
    Class.find()
    .populate({ path: "supervisor", select: {_id: 0, fullname: 1} })
    .then((data)=>{
        console.log("data: ",data);
        if (data.length) {
            const super_class_infos = data.map(
                item => ({
                    supervisor_name: item.supervisor.fullname,
                    super_class_name: item.name,
                })
            );
            res.status(200).json(super_class_infos);
        } else {
            res.status(200).json({ data: "no supervisors assigned to classes yet" });
        }
    })
    .catch(error => next(error));
};